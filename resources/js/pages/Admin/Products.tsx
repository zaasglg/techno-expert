import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Products({ products }: { products: { data: any[], links: any[] } }) {
    const [loading, setLoading] = useState(false);

    const handleImport = () => {
        if (confirm('Импортировать все товары из API? Текущие данные будут удалены.')) {
            setLoading(true);
            router.post('/admin/products/import', {}, {
                onSuccess: () => {
                    setLoading(false);
                    alert('Импорт завершен!');
                },
                onError: () => {
                    setLoading(false);
                    alert('Ошибка импорта');
                }
            });
        }
    };

    return (
        <>
            <style>{`
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html, body { height: 100%; font-family: 'Source Sans Pro', sans-serif; }
                body { background: #f4f6f9; }
                .wrapper { min-height: 100vh; }
                .main-header { background: #fff; border-bottom: 1px solid #dee2e6; padding: 0 1rem; height: 57px; display: flex; align-items: center; justify-content: space-between; }
                .brand-link { font-size: 1.25rem; font-weight: 300; color: #343a40; text-decoration: none; }
                .brand-link b { font-weight: 700; }
                .content-wrapper { padding: 0; min-height: calc(100vh - 57px); }
                .content-header { padding: 15px 30px; }
                .content-header h1 { font-size: 1.8rem; margin: 0; font-weight: 400; }
                .content { padding: 0 30px 30px; }
                .card { background: #fff; border-radius: 0.25rem; box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2); margin-bottom: 20px; }
                .card-header { padding: 0.75rem 1.25rem; background: rgba(0,0,0,.03); border-bottom: 1px solid rgba(0,0,0,.125); }
                .card-body { padding: 1.25rem; }
                .btn { padding: 0.375rem 0.75rem; font-size: 1rem; border-radius: 0.25rem; border: 1px solid transparent; cursor: pointer; }
                .btn-primary { color: #fff; background: #007bff; border-color: #007bff; }
                .btn-primary:hover { background: #0069d9; }
                .table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
                .table th, .table td { padding: 0.5rem; border-top: 1px solid #dee2e6; }
                .table thead th { border-bottom: 2px solid #dee2e6; }
            `}</style>

            <div className="wrapper">
                <nav className="main-header">
                    <a href="/admin/dashboard" className="brand-link">
                        <b>Admin</b>LTE
                    </a>
                </nav>

                <div className="content-wrapper">
                    <div className="content-header">
                        <h1>Товары</h1>
                    </div>

                    <section className="content">
                        <div className="card">
                            <div className="card-header">Управление товарами</div>
                            <div className="card-body">
                                <button onClick={handleImport} className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Импортируется...' : 'Импортировать из API'}
                                </button>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">Список товаров</div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Артикул</th>
                                            <th>Название</th>
                                            <th>Категория</th>
                                            <th>Цена1</th>
                                            <th>Цена2</th>
                                            <th>Остаток</th>
                                            <th>Новинка</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.data.map((product) => (
                                            <tr key={product.article}>
                                                <td>{product.article}</td>
                                                <td>{product.name}</td>
                                                <td>{product.category}</td>
                                                <td>{product.price1}</td>
                                                <td>{product.price2}</td>
                                                <td>{product.quantity}</td>
                                                <td>{product.isnew ? 'Да' : 'Нет'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div style={{ marginTop: '20px', display: 'flex', gap: '5px' }}>
                                    {products.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url || '#'}
                                            style={{
                                                padding: '5px 10px',
                                                border: '1px solid #dee2e6',
                                                background: link.active ? '#007bff' : '#fff',
                                                color: link.active ? '#fff' : '#007bff',
                                                textDecoration: 'none',
                                                borderRadius: '3px',
                                                pointerEvents: link.url ? 'auto' : 'none',
                                                opacity: link.url ? 1 : 0.5
                                            }}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

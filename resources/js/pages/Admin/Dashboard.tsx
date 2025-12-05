import { router } from '@inertiajs/react';

export default function Dashboard() {
    const handleLogout = () => {
        router.post('/admin/logout');
    };

    return (
        <>
            <style>{`
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html, body { height: 100%; font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 1rem; }
                body { background: #f4f6f9; color: #212529; }
                .wrapper { min-height: 100vh; }
                .main-header { position: relative; z-index: 1034; background: #fff; border-bottom: 1px solid #dee2e6; padding: 0 1rem; height: 57px; display: flex; align-items: center; justify-content: space-between; }
                .brand-link { font-size: 1.25rem; line-height: 1.5; font-weight: 300; color: #343a40; text-decoration: none; }
                .brand-link b { font-weight: 700; }
                .content-wrapper { padding: 0; min-height: calc(100vh - 57px); }
                .content-header { padding: 15px 30px; }
                .content-header h1 { font-size: 1.8rem; margin: 0; font-weight: 400; }
                .content { padding: 0 30px 30px; }
                .container-fluid { width: 100%; padding: 0; }
                .row { display: flex; flex-wrap: wrap; margin: 0 -7.5px; }
                .col-lg-3 { flex: 0 0 25%; max-width: 25%; padding: 0 7.5px; }
                @media (max-width: 991px) { .col-lg-3 { flex: 0 0 50%; max-width: 50%; } }
                .small-box { border-radius: 0.25rem; position: relative; display: block; margin-bottom: 20px; box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2); }
                .small-box .inner { padding: 10px; }
                .small-box h3 { font-size: 2.2rem; font-weight: 700; margin: 0 0 10px; white-space: nowrap; }
                .small-box p { font-size: 1rem; margin: 0; }
                .small-box-footer { display: block; padding: 3px 0; text-align: center; text-decoration: none; color: rgba(255,255,255,.8); background: rgba(0,0,0,.1); }
                .small-box-footer:hover { color: #fff; background: rgba(0,0,0,.15); }
                .bg-info { background: #17a2b8 !important; color: #fff; }
                .bg-success { background: #28a745 !important; color: #fff; }
                .bg-warning { background: #ffc107 !important; color: #212529; }
                .bg-danger { background: #dc3545 !important; color: #fff; }
                .btn { display: inline-block; font-weight: 400; text-align: center; white-space: nowrap; vertical-align: middle; user-select: none; border: 1px solid transparent; padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem; transition: all .15s; cursor: pointer; }
                .btn-danger { color: #fff; background: #dc3545; border-color: #dc3545; }
                .btn-danger:hover { background: #c82333; border-color: #bd2130; }
            `}</style>

            <div className="wrapper">
                <nav className="main-header">
                    <a href="/admin/dashboard" className="brand-link">
                        <b>Admin</b>LTE
                    </a>
                    <div>
                        <a href="/admin/categories" style={{ marginRight: '10px', color: '#007bff' }}>Категории</a>
                        <a href="/admin/brands" style={{ marginRight: '10px', color: '#007bff' }}>Бренды</a>
                        <a href="/admin/products" style={{ marginRight: '10px', color: '#007bff' }}>Товары</a>
                        <button onClick={handleLogout} className="btn btn-danger">Выйти</button>
                    </div>
                </nav>

                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <h1>Панель управления</h1>
                        </div>
                    </div>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="small-box bg-info">
                                        <div className="inner">
                                            <h3>150</h3>
                                            <p>Новые заказы</p>
                                        </div>
                                        <a href="#" className="small-box-footer">Подробнее →</a>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="small-box bg-success">
                                        <div className="inner">
                                            <h3>53</h3>
                                            <p>Пользователи</p>
                                        </div>
                                        <a href="#" className="small-box-footer">Подробнее →</a>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="small-box bg-warning">
                                        <div className="inner">
                                            <h3>44</h3>
                                            <p>Регистрации</p>
                                        </div>
                                        <a href="#" className="small-box-footer">Подробнее →</a>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="small-box bg-danger">
                                        <div className="inner">
                                            <h3>65</h3>
                                            <p>Посетители</p>
                                        </div>
                                        <a href="#" className="small-box-footer">Подробнее →</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

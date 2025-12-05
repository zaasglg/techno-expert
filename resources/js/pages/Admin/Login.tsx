import { FormEvent, useState } from 'react';
import { router } from '@inertiajs/react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.post('/admin/login', { email, password });
    };

    return (
        <>
            <style>{`
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html, body { height: 100%; font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
                body { background: #e9ecef; display: flex; align-items: center; justify-content: center; }
                .login-box { width: 360px; }
                .login-logo { font-size: 35px; text-align: center; margin-bottom: 25px; font-weight: 300; }
                .login-logo a { color: #495057; text-decoration: none; }
                .login-logo b { font-weight: 700; }
                .card { background: #fff; border-radius: 0.25rem; box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2); margin-bottom: 1rem; }
                .card-body { padding: 20px; }
                .login-box-msg { margin: 0 0 20px; padding: 0; text-align: center; color: #6c757d; }
                .input-group { position: relative; display: flex; flex-wrap: wrap; align-items: stretch; width: 100%; margin-bottom: 20px; }
                .form-control { display: block; width: 100%; height: calc(2.25rem + 2px); padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; color: #495057; background: #fff; border: 1px solid #ced4da; border-radius: 0; transition: border-color .15s; }
                .form-control:focus { outline: 0; border-color: #80bdff; box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25); }
                .input-group-append { margin-left: -1px; display: flex; }
                .input-group-text { display: flex; align-items: center; padding: 0.375rem 0.75rem; font-size: 1rem; font-weight: 400; line-height: 1.5; color: #495057; text-align: center; background: #e9ecef; border: 1px solid #ced4da; border-radius: 0; }
                .row { display: flex; flex-wrap: wrap; margin: 0 -5px; }
                .col-12 { flex: 0 0 100%; max-width: 100%; padding: 0 5px; }
                .btn { display: inline-block; font-weight: 400; text-align: center; white-space: nowrap; vertical-align: middle; user-select: none; border: 1px solid transparent; padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem; transition: all .15s; cursor: pointer; }
                .btn-primary { color: #fff; background: #007bff; border-color: #007bff; }
                .btn-primary:hover { background: #0069d9; border-color: #0062cc; }
                .btn-block { display: block; width: 100%; }
            `}</style>
            
            <div className="login-box">
                <div className="login-logo">
                    <a href="/admin"><b>Admin</b>LTE</a>
                </div>
                <div className="card">
                    <div className="card-body">
                        <p className="login-box-msg">Войдите, чтобы начать сеанс</p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span>✉</span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span>🔒</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary btn-block">Войти</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

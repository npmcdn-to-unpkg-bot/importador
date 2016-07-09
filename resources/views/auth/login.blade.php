<div class="container">
    <div class="content">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                <div class="panel panel-default" >
                    <div class="panel-heading auth-panel-heading">
                        <h3 class="panel-title">Login</h3>
                    </div>
                    <div class="panel-body" style="margin:10px;">
                        <div class="row">
                            <form   method="POST"
                                    action="/jsandoc/auth/login"
                                    class="form-horizontal"
                            >
                                {!! csrf_field() !!}
                                <div class="form-group">
                                    <label  class="col-xs-12 col-sm-3 col-lg-2" for="email">Email:</label>
                                    <div class="col-xs-12 col-sm-9 col-lg-10">
                                        <input  type="email"
                                                class="form-control"
                                                id="email"
                                                placeholder="Email"
                                                value="{{ old('email') }}"
                                                name="email"
                                        >
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-3 col-lg-2" for="password">Password:</label>
                                    <div class="col-xs-12 col-sm-9 col-lg-10">
                                        <input  type="password"
                                                class="form-control"
                                                id="password"
                                                placeholder="Password"
                                                value="{{ old('password') }}"
                                                name="password"
                                        >
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-3 col-lg-2" for="remember"> Remember Me:</label>
                                    <div class="col-xs-12 col-sm-9 col-lg-10">
                                        <input  type="checkbox"
                                                class="form-control"
                                                id="remember"
                                                placeholder="Remember Me:"
                                                value="{{ old('remember') }}"
                                                name="remember"
                                        >
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-xs-offset-3 col-xs-6">
                                      <button type="submit" class="btn btn-default btn-block">Login</button>
                                    </div>
                                </div>

                            </form>
                            <a href="register">Registrar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
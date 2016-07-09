<!-- resources/views/auth/register.blade.php -->
<div class="container">
    <div class="content">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                <div class="panel panel-default" >
                    <div class="panel-heading auth-panel-heading">
                        <h3 class="panel-title">Registro</h3>
                    </div>
                    <div class="panel-body" style="margin:10px;">
                        <div class="row">
                            <form   method="POST"
                                    action="/jsandoc/auth/register"
                                    class="form-horizontal"
                            >
                                {!! csrf_field() !!}

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-lg-3" for="name">Nombre:</label>
                                    <div class="col-xs-12 col-sm-8 col-lg-9">
                                        <input  type="text"
                                                class="form-control"
                                                id="name"
                                                placeholder="Nombre"
                                                value="{{ old('name') }}"
                                                name="name"
                                        >
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-lg-3" for="name">Nick:</label>
                                    <div class="col-xs-12 col-sm-8 col-lg-9">
                                        <input  type="text"
                                                class="form-control"
                                                id="nick"
                                                placeholder="Nick"
                                                value="{{ old('nick') }}"
                                                name="nick"
                                        >
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-lg-3" for="user_namespace">Espacio de nombre:</label>
                                    <div class="col-xs-12 col-sm-8 col-lg-9">
                                        <input  type="text"
                                                class="form-control"
                                                id="user_namespace"
                                                placeholder="Espacio de nombre de usuario"
                                                value="{{ old('user_namespace') }}"
                                                name="user_namespace"
                                        >
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label  class="col-xs-12 col-sm-4 col-lg-3" for="email">Email:</label>
                                    <div class="col-xs-12 col-sm-8 col-lg-9">
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
                                    <label class="col-xs-12 col-sm-4 col-lg-3" for="password">Password:</label>
                                    <div class="col-xs-12 col-sm-8 col-lg-9">
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
                                    <label class="col-xs-12 col-sm-4 col-lg-3" for="password_confirmation"> Confirm Password:</label>
                                    <div class="col-xs-12 col-sm-8 col-lg-9">
                                        <input  type="password"
                                                class="form-control"
                                                id="password_confirmation"
                                                placeholder=" Confirm Password:"
                                                value="{{ old('password_confirmation') }}"
                                                name="password_confirmation"
                                        >
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-xs-offset-3 col-xs-6">
                                      <button type="submit" class="btn btn-default btn-block">Register</button>
                                    </div>
                                </div>

                            </form>
                            <a href="login">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
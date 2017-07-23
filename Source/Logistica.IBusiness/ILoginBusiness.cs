namespace Logistica.IBusiness
{
    using Logistica.ViewModel;
    public interface ILoginBusiness
    {
        UsuarioViewModel LoginUser(LoginViewModel login);

        bool Registracion(RegistrarseViewModel userView);
    }
}

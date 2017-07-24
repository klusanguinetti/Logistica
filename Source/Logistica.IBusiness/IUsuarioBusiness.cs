using Logistica.ViewModel;

namespace Logistica.IBusiness
{
    public interface IUsuarioBusiness
    {
        DatosPersonaViewModel ObtenerDatosPersonales(string mail);
        
    }
}
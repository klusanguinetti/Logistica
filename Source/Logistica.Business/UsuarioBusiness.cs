using Logistica.Common;
using Logistica.IBusiness;
using Logistica.IDataAccess;
using Logistica.UnityInject;
using Logistica.ViewModel;

namespace Logistica.Business
{
    public class UsuarioBusiness : IUsuarioBusiness
    {
        public DatosPersonaViewModel ObtenerDatosPersonales(string mail)
        {
            var dato = DependencyFactory.Resolve<IUsuarioDA>().ObtenerDatosPersonales(mail);
            if (dato == null)
                throw new ExceptionBusiness(6, "No se encuntra la información");
            return dato.MapperClass<DatosPersonaViewModel>(TypeMapper.IgnoreCaseSensitive);
        }

    }
}
using System.Linq;
using Logistica.Common;
using Logistica.Entity;

namespace Logistica.Business
{
    using ViewModel;
    using IBusiness;
    using IDataAccess;
    using UnityInject;
    using System;
    using System.Text;

    public class LoginBusiness : ILoginBusiness
    {

        public virtual UsuarioViewModel LoginUser(LoginViewModel login)
        {
            var user = DependencyFactory.Resolve<IUsuarioDA>().LoginUser(login.Name, login.Password);
            if (user == null)
                throw new ExceptionBusiness(2, "Usuario/Contraseña no encontrado");
            var userReturn = FillViewModel.FillUsuarioViewModel(user);
            user.UltimoLogin = DateTime.Now;
            DependencyFactory.Resolve<IUsuarioDA>().Save(user);
            var lMenu = DependencyFactory.Resolve<IUsuarioDA>().GetMenu(user);
            userReturn.Menu = lMenu.MapperEnumerable<MenuViewModel>(TypeMapper.IgnoreCaseSensitive).ToList();
            return userReturn;
        }

        public virtual bool Registracion(RegistrarseViewModel userView)
        {
            if (!DependencyFactory.Resolve<IUsuarioDA>().ExisteUsuario(userView.Mail))
            {
                var user = userView.MapperClass<Usuario>(TypeMapper.IgnoreCaseSensitive);
                var il = DependencyFactory.Resolve<IBaseDA<TipoUsuario>>().GetAll();
                TipoUsuario tipoUsuario = il.FirstOrDefault(o => o.IsDefault != null && o.IsDefault.Equals("S"));
                if (tipoUsuario != null)
                {
                    user.TipoUsuario = tipoUsuario;
                    user.DatosPersona = new DatosPersona { Usuario = user, Nombre = userView.Nombre, Apellido = userView.Apellido };
                }
                else
                {
                    throw new ExceptionBusiness(5, "Error en selección de tipo de usuario.");
                }
                DependencyFactory.Resolve<IUsuarioDA>().Save(user);
                return true;
            }
            else
            {
                throw new ExceptionBusiness(4, "Usuario ya existe.");
            }
        }
    }
}

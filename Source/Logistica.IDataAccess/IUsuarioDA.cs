using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Logistica.Entity;

namespace Logistica.IDataAccess
{
    public interface IUsuarioDA : IBaseDA<Usuario>
    {
        Usuario LoginUser(string mail, string password);

        List<Menu> GetMenu(Usuario usuario);

        bool ExisteUsuario(string mail);

        DatosPersona ObtenerDatosPersonales(string mail);
    }
}

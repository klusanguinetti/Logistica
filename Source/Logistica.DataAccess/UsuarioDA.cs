namespace Logistica.DataAccess
{
    using System;
    using System.Text;
    using System.Linq;
    using System.Collections.Generic;
    using NHibernate;
    using NHibernate.Linq;
    using Logistica.Entity;
    using Logistica.IDataAccess;

    public class UsuarioDA : BaseDataAccess<Usuario>, IUsuarioDA
    {
        public new virtual void Save(Usuario user)
        {
            if (user.Id.Equals(0) && !string.IsNullOrWhiteSpace(user.Password))
                user.Password = Common.Encrypt.EncryptToBase64String(user.Password);
            base.Save(user);
        }
        public virtual Usuario LoginUser(string mail, string password)
        {

            //byte[] data = Convert.FromBase64String(password);
            //string decodedPassword = Encoding.UTF8.GetString(data);

            password = Common.Encrypt.EncryptToBase64String(password);
            return Session.Query<Usuario>().FirstOrDefault(o => o.Password.Equals(password) && o.Mail.ToUpper().Equals(mail.ToUpper()));
        }

        public DatosPersona ObtenerDatosPersonales(string mail)
        {
            var user = Session.Query<Usuario>().FirstOrDefault(o => o.Mail.ToUpper().Equals(mail.ToUpper()));
            if (user == null)
                return null;
            return user.DatosPersona;
        }

        public virtual Usuario Registracion(Usuario usuario)
        {
            if (usuario != null && usuario.Id.Equals(0) &&
                !string.IsNullOrWhiteSpace(usuario.Mail) &&
                !string.IsNullOrWhiteSpace(usuario.Password) && usuario.Password.Length >= 8)
            {
                Save(usuario);
            }
            return usuario;
        }

        public virtual Usuario ActualizarPassword(Usuario usuario)
        {
            usuario.Password = Common.Encrypt.EncryptToBase64String(usuario.Password);
            base.Save(usuario);
            return usuario;
        }

        public bool ExisteUsuario(string mail)
        {
            return !Session.Query<Usuario>().Count(o => o.Mail.ToUpper().Equals(mail.ToUpper().Trim())).Equals(0);
        }

        public List<Menu> GetMenu(Usuario usuario)
        {
            return Session.Query<Menu>().Where(o => o.TipoUsuario.Id == usuario.TipoUsuario.Id).ToList();
        }
    }
}

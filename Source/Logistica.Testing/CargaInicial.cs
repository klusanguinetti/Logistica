using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Logistica.Configuration;
using Logistica.Entity;
using Logistica.IDataAccess;
using Logistica.UnityInject;
using NUnit.Framework;

namespace Logistica.Testing
{
    [SetUpFixture]
    public class InicioPruebas
    {

        [SetUp]
        public void Init()
        {
            ConfigAll.Instance.Init();
        }

        [TearDown]
        public void Dispose()
        {
            ConfigAll.Instance.Dispose();
        }
    }

    [TestFixture]
    public class LimpiesaDB
    {
        private void Detele(dynamic dataAccess)
        {
            foreach (var d in dataAccess.GetAll())
            {
                dataAccess.Delete(d);
            }
        }

        

        [Test]
        public void A_Limpiesa()
        {

            #region borrado

            dynamic dataAccess = DependencyFactory.Resolve<IBaseDA<Reserva>>();
            Detele(dataAccess);
            Detele(DependencyFactory.Resolve<IBaseDA<Menu>>());
            
            Detele(DependencyFactory.Resolve<IBaseDA<Producto>>());
            Detele(DependencyFactory.Resolve<IBaseDA<TipoProducto>>());
            Detele(DependencyFactory.Resolve<IBaseDA<Usuario>>());
            Detele(DependencyFactory.Resolve<IBaseDA<TipoUsuario>>());
            #endregion
        }
        [Test]
        public void B_CargaDatosBasicos()
        {
            TipoUsuario tu = new TipoUsuario { Descripcion = "Administrador" };
            dynamic dataAccess = DependencyFactory.Resolve<IBaseDA<TipoUsuario>>();
            dataAccess.Save(tu);
            tu = new TipoUsuario { Descripcion = "Cliente", IsDefault = "S" };
            dataAccess.Save(tu);
            Menu menu = new Menu { Nombre = "Datos Personales", TipoUsuario = tu, Url = "/DatosPersonales/Modificacion" };
            dataAccess = DependencyFactory.Resolve<IBaseDA<Menu>>();
            dataAccess.Save(menu);
        }
    }
}

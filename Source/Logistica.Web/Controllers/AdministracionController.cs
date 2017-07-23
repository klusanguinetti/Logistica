using System.Web.Mvc;

namespace Logistica.Web.Controllers
{
    public class AdministracionController : Controller
    {
        // GET: Administracion
        public ActionResult AdministracionBaja()
        {
            return View();
        }

        public ActionResult ActivacionDesactivacion()
        {
            return View();
        }

        public ActionResult AdministracionAlta()
        {
            return View();
        }

        public ActionResult AdministracionAjustesManuales()
        {
            return View();
        }

        public ActionResult AdministracionReprocesoAcreditacion()
        {
            return View();
        }

        public ActionResult AdministracionReprocesoCierre()
        {
            return View();
        }
    }
}
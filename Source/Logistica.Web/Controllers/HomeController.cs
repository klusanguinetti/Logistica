namespace Logistica.Web.Controllers
{
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Container()
        {
            return View();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LogOff()
        {
            return View();
        }

    }
}
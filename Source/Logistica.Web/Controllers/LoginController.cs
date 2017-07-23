using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Logistica.Web.Controllers
{
    public class LoginController : Controller
    {
        
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult Registracion()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Container()
        {
            return View();
        }
        //public ActionResult UserLogIn()
        //{
        //    return View();
        //}
    }
}
namespace Logistica.Web.Controllers
{
    using System.Web.Http;
    public class BaseApiController : ApiController
    {
        protected string GetIp()
        {
            return ((System.Web.HttpContextWrapper)Request.Properties["MS_HttpContext"]).Request.UserHostAddress;
        }

        protected string GetUsername()
        {
            return ((System.Web.HttpContextWrapper)Request.Properties["MS_HttpContext"]).Request.LogonUserIdentity?.Name;
        }
    }
}
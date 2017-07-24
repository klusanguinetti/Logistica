




using Logistica.ViewModel;

namespace Logistica.Web
{
    using System;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;
    using Logistica.Configuration;
    using Logistica.Web.Security;
    public class MvcApplication : System.Web.HttpApplication
    {

        #region constructor
        public MvcApplication()
        {
            this.BeginRequest += MvcApplication_BeginRequest;
        }
        #endregion

        #region atributo
        //private ConfigurationStart _start;
        #endregion

        #region metodos
        private void MvcApplication_BeginRequest(object sender, EventArgs e)
        {
            if (ConfigAll.Instance.IsClearContainer)
                ConfigAll.Instance.Init();

        }
        protected void Application_Start(object sender, EventArgs e)
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            //using (PerformanceTraceToken token = PerformanceTraceHelper.BeginTrace("Logistica.Web", "Global.Application_Start", "Iniciando el Service Catalog"))
            //{
            //    try
            //    {
            //        RuntimeManager.Init();
            //        if (_start == null)
            //            _start = new ConfigurationStart();
            //        _start.Start();
                    AreaRegistration.RegisterAllAreas();
                    FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
                    RouteConfig.RegisterRoutes(RouteTable.Routes);
                    BundleConfig.RegisterBundles(BundleTable.Bundles);
            ConfigAll.Instance.Init();
            //PerformanceTraceHelper.EndTrace(token);
            //}
            //catch (Exception ex)
            //{
            //    TraceHelper.Error(ex, "Error al inicializar el Service Catalog.");
            //    PerformanceTraceHelper.EndTrace(token, ex);
            //    throw;
            //}
            //}
        }
        
        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            if (Request.IsAuthenticated)
            {
                var userData = AuthenticationFormsClient.GetUsuario(Context.Request);
                if (userData != null)
                    Context.User = new PDCPrincipal(userData);
            }
        }

        public override void Dispose()
        {
            ConfigAll.Instance.Dispose();
            base.Dispose();
        }
        #endregion
    }
}

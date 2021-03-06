﻿namespace Logistica.Web
{
    using System;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;
    using Logistica.Configuration;

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

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            ConfigAll.Instance.Init();

        }



        public override void Dispose()
        {
            ConfigAll.Instance.Dispose();
            base.Dispose();
        }
        #endregion
    }
}

using System.Security.Cryptography;
using System.Web;

namespace Logistica.Web
{
    using System.Web.Optimization;
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/angular-block-ui.css",
                "~/Content/angular-data-grid.material.css",
                "~/Content/angular-material.min.css",
                "~/Content/bootstrap.css",
                "~/Content/font-awesome.min.css",
                "~/Content/common.css",
                "~/Content/mdPickers.css",
                "~/Content/angular-moment-picker.css",
                "~/Content/material-ui.css").WithLastModifiedToken());
            
            //"~/Content/sb-admin-2.css"

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-animate.min.js",
                "~/Scripts/angular-aria.min.js",
                "~/Scripts/angular-material.js",
                "~/Scripts/angular-messages.min.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/mdPickers.js",
                "~/Scripts/mdPickers.min.js",
                "~/Scripts/moment.js",
                "~/Scripts/tabs.js",
                "~/Scripts/i18n/angular-locale_es-ar.js",
                "~/Scripts/angular-moment-picker/angular-moment-picker.js",
                "~/Scripts/angular-moment-picker/moment-with-locales.js"));


            bundles.Add(new ScriptBundle("~/bundles/app")
                .Include("~/Scripts/app/appPoderDeCompra.js")
                .IncludeDirectory("~/Scripts/app/Common", "*.js")
                .IncludeDirectory("~/Scripts/app/Directives", "*.js")
                .IncludeDirectory("~/Scripts/app/Controllers", "*.js")
                .IncludeDirectory("~/Scripts/app/Services", "*.js")
                .IncludeDirectory("~/Scripts/angular-data-grid/dist", "*.js")
                .IncludeDirectory("~/Scripts/angular-block-ui-master/dist", "*.js")
                .WithLastModifiedToken());
        }


    }
}

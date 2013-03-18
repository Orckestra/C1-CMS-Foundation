using System;
using System.Configuration;
using System.IO;
using Composite.Core.Application;
using Composite.Core.Application.Plugins.ApplicationOnlineHandler;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Application.ApplicationOnlineHandlers.AspNetApplicationOnlineHandler
{
    [ConfigurationElementType(typeof(AspNetApplicationOnlineHandlerData))]
    internal sealed class AspNetApplicationOnlineHandler : IApplicationOnlineHandler
    {
        private readonly string _sourceFilename;


        public AspNetApplicationOnlineHandler(string appOfflineFilename)
        {
            Verify.ArgumentNotNullOrEmpty(appOfflineFilename, "appOfflineFilename");

            _sourceFilename = Path.Combine(PathUtil.BaseDirectory, PathUtil.Resolve(appOfflineFilename));
        }


        public void TurnApplicationOffline()
        {
            ApplicationOfflineCheckHttpModule.FilePath = _sourceFilename;
            ApplicationOfflineCheckHttpModule.IsOffline = true;
        }
        

        public void TurnApplicationOnline()
        {
            ApplicationOfflineCheckHttpModule.IsOffline = false;
        }

        public bool IsApplicationOnline()
        {
            return !ApplicationOfflineCheckHttpModule.IsOffline;
        }


        public bool CanPutApplicationOffline(out string errorMessage)
        {
            if(!C1File.Exists(_sourceFilename))
            {
                errorMessage = "AspNetApplicationOnlineHandler: Template file '{0}' is missing".FormatWith(_sourceFilename);
                return false;
            }

            string websiteRoot = PathUtil.BaseDirectory;
            if (!PathUtil.WritePermissionGranted(websiteRoot))
            {
                errorMessage = StringResourceSystemFacade.GetString(
                    "Composite.Core.PackageSystem.PackageFragmentInstallers", "NotEnoughNtfsPermissions")
                    .FormatWith(websiteRoot);

                return false;
            }

            errorMessage = null;
            return true;
        }
    }


    [Assembler(typeof(AspNetApplicationOnlineHandlerAssembler))]
    internal class AspNetApplicationOnlineHandlerData : ApplicationOnlineHandlerData
    {
        private const string _appOfflineFilenamePropertyName = "appOfflineFilename";
        [ConfigurationProperty(_appOfflineFilenamePropertyName, IsRequired = true)]
        public string AppOfflineFilename
        {
            get { return (string)base[_appOfflineFilenamePropertyName]; }
            set { base[_appOfflineFilenamePropertyName] = value; }
        }
    }


    internal sealed class AspNetApplicationOnlineHandlerAssembler : IAssembler<IApplicationOnlineHandler, ApplicationOnlineHandlerData>
    {
        public IApplicationOnlineHandler Assemble(IBuilderContext context, ApplicationOnlineHandlerData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            AspNetApplicationOnlineHandlerData data = (AspNetApplicationOnlineHandlerData)objectConfiguration;

            return new AspNetApplicationOnlineHandler(data.AppOfflineFilename);
        }
    }
}

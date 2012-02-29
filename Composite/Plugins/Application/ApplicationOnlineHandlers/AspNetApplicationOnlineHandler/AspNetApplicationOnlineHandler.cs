using System;
using System.Configuration;
using System.IO;
using System.Threading;
using Composite.Core;
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
        private static readonly string LogTitle = typeof (AspNetApplicationOnlineHandler).Name;
        private const int RetriesCount = 10;

        private readonly string _sourceFilename;
        private readonly string _targetFilename;


        public AspNetApplicationOnlineHandler(string appOfflineFilename)
        {
            Verify.ArgumentNotNullOrEmpty(appOfflineFilename, "appOfflineFilename");

            _sourceFilename = Path.Combine(PathUtil.BaseDirectory, PathUtil.Resolve(appOfflineFilename));

            string filename = Path.GetFileName(_sourceFilename);

            // File will be moved to the root of the website
            _targetFilename = Path.Combine(PathUtil.BaseDirectory, filename);
        }



        public void TurnApplicationOffline()
        {
            // If app_offline.htm already exists, no reason do copy it again
            if (!File.Exists(_targetFilename))
            {
                FileUtils.Delete(_targetFilename);
                C1File.Copy(_sourceFilename, _targetFilename, true);
            }

            ApplicationOfflineCheckHttpModule.FilePath = _targetFilename;
            ApplicationOfflineCheckHttpModule.IsOffline = true;
        }



        public void TurnApplicationOnline()
        {
            ApplicationOfflineCheckHttpModule.IsOffline = false;

            int triesLeft = RetriesCount;
            Exception lastException = null;

            while (triesLeft > 0)
            {
                try
                {
                    FileUtils.Delete(_targetFilename);
                    return;
                }
                catch (UnauthorizedAccessException ex)
                {
                    lastException = ex;

                    triesLeft--;
                    if(triesLeft > 0)
                    {
                        Thread.Sleep(200);
                    }
                }
            }

            Log.LogError(LogTitle, "Failed to delete file '{0}' after {1} retries", _targetFilename, RetriesCount);
            if(lastException != null)
            {
                Log.LogError(LogTitle, lastException);
            }
        }

        public bool IsApplicationOnline()
        {
            return C1File.Exists(_targetFilename) == false;
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

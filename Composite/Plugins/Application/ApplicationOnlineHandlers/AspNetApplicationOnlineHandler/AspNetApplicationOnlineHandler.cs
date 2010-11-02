using System;
using System.Configuration;
using Composite.Core.Application;
using Composite.Core.Application.Plugins.ApplicationOnlineHandler;
using Composite.Core.IO;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Application.ApplicationOnlineHandlers.AspNetApplicationOnlineHandler
{
    [ConfigurationElementType(typeof(AspNetApplicationOnlineHandlerData))]
    internal sealed class AspNetApplicationOnlineHandler : IApplicationOnlineHandler
    {
        private string _sourceFilename;
        private string _targetFilename;


        public AspNetApplicationOnlineHandler(string appOfflineFilename)
        {
            if (string.IsNullOrEmpty(appOfflineFilename) == true) throw new ArgumentNullException("appOfflineFilename");

            _sourceFilename = System.IO.Path.Combine(PathUtil.Resolve(PathUtil.BaseDirectory), PathUtil.Resolve(appOfflineFilename));

            string filename = System.IO.Path.GetFileName(_sourceFilename);

            _targetFilename = System.IO.Path.Combine(PathUtil.Resolve(PathUtil.BaseDirectory), filename);
        }



        public void TurnApplicationOffline()
        {
            FileEx.Delete(_targetFilename);
            File.Copy(_sourceFilename, _targetFilename, true);

            ApplicationOfflineCheckHttpModule.FilePath = _targetFilename;
            ApplicationOfflineCheckHttpModule.IsOffline = true;
        }



        public void TurnApplicationOnline()
        {
            ApplicationOfflineCheckHttpModule.IsOffline = false;
            FileEx.Delete(_targetFilename);
        }



        public bool IsApplicationOnline()
        {
            return File.Exists(_targetFilename) == false;
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

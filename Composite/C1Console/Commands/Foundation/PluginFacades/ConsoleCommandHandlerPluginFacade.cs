using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Composite.C1Console.Commands.Plugins.ConsoleCommandHandler.Runtime;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;

namespace Composite.C1Console.Commands.Foundation.PluginFacades
{
    class ConsoleCommandHandlerPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitializeResources);


        static ConsoleCommandHandlerPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }

        internal static IConsoleCommandHandler GetConsoleCommandHandler(string pluginName)
        {
            IConsoleCommandHandler plugin;

            var resources = _resourceLocker.Resources;

            if (!resources.ConsoleCommandHandlers.TryGetValue(pluginName, out plugin))
            {
                return null;
            }

            return plugin;
        }

        private static ConsoleCommandHandlerSettings GetSettings()
        {
            var configuration = ConfigurationServices.ConfigurationSource;

            if (configuration == null) return null;

            return configuration.GetSection(ConsoleCommandHandlerSettings.SectionName) as ConsoleCommandHandlerSettings;
        }


        public static bool HasConfiguration()
        {
            return GetSettings() != null;
        }


        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", ConsoleCommandHandlerSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            ConsoleCommandHandlerFactory Factory { get; set; }
            public IReadOnlyDictionary<string, IConsoleCommandHandler> ConsoleCommandHandlers { get; private set; }

            public static void DoInitializeResources(Resources resources)
            {
                var settings = GetSettings();
                if (settings == null) return;

                try
                {
                    var factory = resources.Factory = new ConsoleCommandHandlerFactory();

                    resources.ConsoleCommandHandlers = settings.ConsoleCommandHandlers.ToDictionary(data => data.Name, data => factory.Create(data.Name));
                }
                catch (Exception ex)
                {
                    if (!(ex is ArgumentException) && !(ex is ConfigurationErrorsException)) throw;

                    HandleConfigurationError(ex);
                }
            }
        }
    }
}

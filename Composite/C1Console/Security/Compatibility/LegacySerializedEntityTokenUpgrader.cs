using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Data;
using Composite.Data.DynamicTypes;

namespace Composite.C1Console.Security.Compatibility
{
    /// <summary>
    /// Will auto upgrade serialized entity tokens and data ids, stored in c1 data. Needed because serialization has changed.  
    /// </summary>
    [ApplicationStartup(AbortStartupOnException = false)]
    public static class LegacySerializedEntityTokenUpgrader
    {
        const string _configFilename = "LegacySerializedEntityTokenUpgrader.config";
        static readonly XName _docRoot = "UpgradeSettings";
        private static ILog _log;

        /// <summary>
        /// See class description - this allow us to run on startup
        /// </summary>
        /// <param name="log"></param>
        public static void OnInitialized(ILog log)
        {
            if (ShouldRun)
            {
                _log = log;
                try
                {
                    Run();
                }
                catch (Exception ex)
                {
                    _log.LogError(nameof(LegacySerializedEntityTokenUpgrader), ex);

                    throw;
                }
            }

        }

        private static void Run()
        {
            UpgradeStoredData();

            var config = GetConfigElement();

            config.SetAttributeValue("last-run", DateTime.Now);
            config.SetAttributeValue("completed", true);

            config.Save(ConfigFilePath);
        }

        private static bool ShouldRun
        {
            get
            {
                var _xConfig = GetConfigElement();
                return true == (bool)_xConfig.Attribute("enabled") &&
                    (false == (bool)_xConfig.Attribute("completed") ||
                    true == (bool)_xConfig.Attribute("force") ||
                    (DateTime)_xConfig.Attribute("last-run") - (DateTime)_xConfig.Attribute("inception") < TimeSpan.FromMinutes(5));
            }
        }


        private static string ConfigFilePath
        {
            get
            {
                var configDir = PathUtil.Resolve(GlobalSettingsFacade.ConfigurationDirectory);
                var configFilePath = Path.Combine(configDir, _configFilename);

                return configFilePath;
            }
        }

        private static XElement GetConfigElement()
        {
            XDocument config = null;

            if (File.Exists(ConfigFilePath))
            {
                config = XDocument.Load(ConfigFilePath);
            }
            else
            {
                config = new XDocument(
                    new XElement(_docRoot,
                        new XAttribute("inception", DateTime.Now),
                        new XAttribute("force", false),
                        new XAttribute("completed", false),
                        new XAttribute("enabled", true)));
            }

            return config.Root;
        }


        private static void UpgradeStoredData()
        {
            const string _ET = "EntityToken";
            const string _DSI = "DataSourceId";

            List<string> magicPropertyNames = new List<string> { _ET, _DSI };
            Func<DataFieldDescriptor, bool> isSerializedFieldFunc = g => magicPropertyNames.Any(s => g.Name.Contains(s));
            var descriptors = DataMetaDataFacade.AllDataTypeDescriptors.Where(f => f.Fields.Any(isSerializedFieldFunc));

            foreach (var descriptor in descriptors)
            {
                Type dataType = descriptor.GetInterfaceType();

                if (dataType == null)
                {
                    continue;
                }

                var propertiesToUpdate = new List<PropertyInfo>();
                foreach (var tokenField in descriptor.Fields.Where(isSerializedFieldFunc))
                {
                    var tokenProperty = dataType.GetProperty(tokenField.Name);
                    propertiesToUpdate.Add(tokenProperty);
                }

                using (var dc = new DataConnection(PublicationScope.Unpublished))
                {
                    var allRows = DataFacade.GetData(dataType).ToDataList();

                    foreach (var rowItem in allRows)
                    {
                        bool rowChange = false;

                        foreach (var tokenProperty in propertiesToUpdate)
                        {
                            string token = tokenProperty.GetValue(rowItem) as string;

                            if (tokenProperty.Name.Contains(_ET))
                            {
                                try
                                {
                                    var entityToken = EntityTokenSerializer.Deserialize(token);
                                    var tokenReserialized = EntityTokenSerializer.Serialize(entityToken);

                                    if (tokenReserialized != token)
                                    {
                                        tokenProperty.SetValue(rowItem, tokenReserialized);
                                        rowChange = true;
                                    }
                                }
                                catch (Exception ex)
                                {
                                    _log.LogError(nameof(LegacySerializedEntityTokenUpgrader), "Failed to upgrade old token {0} from data type {1} as EntityToken.\n{2}", token, dataType.FullName, ex);
                                }
                            }

                            if (tokenProperty.Name.Contains(_DSI))
                            {
                                try
                                {
                                    token = EnsureValidDataSourceId(token);
                                    var dataSourceId = DataSourceId.Deserialize(token);
                                    var dataSourceIdReserialized = dataSourceId.Serialize();

                                    if (dataSourceIdReserialized != token)
                                    {
                                        tokenProperty.SetValue(rowItem, dataSourceIdReserialized);
                                        rowChange = true;
                                    }
                                }
                                catch (Exception ex)
                                {
                                    _log.LogError(nameof(LegacySerializedEntityTokenUpgrader), "Failed to upgrade old token {0} from data type {1} as DataSourceId.\n{2}", token, dataType.FullName, ex);
                                }
                            }

                            if (rowChange) DataFacade.Update(rowItem);
                        }
                    }
                }
            }
        }

        private static string EnsureValidDataSourceId(string token)
        {
            try
            {
                // fixing specific data inconsistency, where old serialized data id's for versioned data do not reflect versionid property added in a later version
                if (token.Contains("Composite_Data_Types_IPagePlaceholderContentDataId") && !token.Contains("VersionId"))
                {
                    var pageId = Guid.Parse(token.Substring(19, 36));
                    token = token.Replace("'_dataIdType_", String.Format(",\\ VersionId=\\'{0}\\''_dataIdType_", pageId));
                }
            }
            catch(Exception) {
                // if we have an issue, caller will act 
            }

            return token;
        }
    }
}

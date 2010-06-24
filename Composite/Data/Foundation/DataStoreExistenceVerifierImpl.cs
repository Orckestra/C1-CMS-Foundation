using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation.PluginFacades;
using Composite.Data.Plugins.DataProvider.Runtime;
using Composite.Data.Types;
using Composite.Logging;



namespace Composite.Data.Foundation
{   
    internal sealed class DataStoreExistenceVerifierImpl : IDataStoreExistenceVerifier
    {
        // Interfaces in this list will have a store created on system start if they do not exists
        private static List<Type> _interfaceTypes = new List<Type>
                {
                    typeof(ICompositionContainer),
                    typeof(IPage),                    
                    typeof(IPageStructure),
                    typeof(IPageHostNameBinding),                    
                    typeof(IPagePlaceholderContent),                    
                    typeof(IPageFolderDefinition),
                    typeof(IPageMetaDataDefinition),
                    typeof(IPageTemplate),
                    typeof(IPageType),
                    typeof(IPageTypeParentRestriction),
                    typeof(IPageTypePageTemplateRestriction),                    
                    typeof(IPageTypeDefaultPageContent),
                    typeof(IPageTypeTreeLink),
                    typeof(IPageTypeDataFolderTypeLink),
                    typeof(IPageTypeMetaDataTypeLink),
                    typeof(IPagePublishSchedule),
                    typeof(IPageUnpublishSchedule),
                    typeof(IUser),
                    typeof(IUserGroup),
                    typeof(IUserUserGroupRelation),
                    typeof(IUserActivePerspective),
                    typeof(IUserGroupActivePerspective),
                    typeof(IUserDeveloperSettings),
                    typeof(IUserPermissionDefinition),
                    typeof(IUserGroupPermissionDefinition),
                    typeof(IUserPermissionDefinitionPermissionType),
                    typeof(IUserGroupPermissionDefinitionPermissionType),
                    typeof(IUserSettings),
                    typeof(IUserActiveLocale),
                    typeof(IVisualFunction),
                    typeof(IXhtmlEditorElementClassConfiguration),
                    typeof(IMediaFile),
                    typeof(IMediaFileFolder),
                    typeof(IMediaFileData),
                    typeof(IMediaFolderData),
                    typeof(IMethodBasedFunctionInfo),
                    typeof(ISqlConnection),
                    typeof(ISqlFunctionInfo),
                    typeof(INamedFunctionCall),
                    typeof(IXsltFunction),
                    typeof(IParameter),
                    typeof(ILockingInformation),
                    typeof(IFolderWhiteList),
                    typeof(IPackageServerSource),
                    typeof(ISystemActiveLocale),
                    typeof(IFlowInformation), 
                    typeof(IUserConsoleInformation),
                    typeof(IWhiteListedLocale),
                    typeof(ITaskItem),
                    typeof(ISearchEngineOptimizationKeyword),
                    typeof(IDataItemTreeAttachmentPoint),
                    typeof(IGeneratedTypeWhiteList)
                };        


        public IEnumerable<Type> InterfaceTypes
        {
            get {
                foreach (Type type in _interfaceTypes)
                {
                    yield return type;
                }
            }
        }



        public bool EnsureDataStores()
        {
            if (DataProviderPluginFacade.HasConfiguration() == true)
            {
                List<DataTypeDescriptor> typeDescriptors = new List<DataTypeDescriptor>();

                foreach (Type type in _interfaceTypes)
                {
                    try
                    {
                        if (DataProviderRegistry.AllKnownInterfaces.Contains(type) == false)
                        {
                            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(type);

                            dataTypeDescriptor.Validate();

                            DataProviderPluginFacade.CreateStore(DataProviderRegistry.DefaultDynamicTypeDataProviderName, dataTypeDescriptor);

                            typeDescriptors.Add(dataTypeDescriptor);

                            LoggingService.LogVerbose("DataStoreExistenceVerifier", string.Format("A store for the type '{0}' has been created", type));
                        }
                    }
                    catch (Exception ex)
                    {
                        throw new InvalidOperationException(string.Format("Creating '{0}' store failed", type), ex);
                    }
                }

                return typeDescriptors.Count > 0;
            }
            else
            {
                LoggingService.LogError("DataStoreExistenceVerifier", string.Format("Failed to load the configuration section '{0}' from the configuration", DataProviderSettings.SectionName));
                return false;
            }
        }
    }
}

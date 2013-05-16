using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation.PluginFacades;
using Composite.Data.Plugins.DataProvider.Runtime;
using Composite.Data.Types;
using Composite.Core.Logging;



namespace Composite.Data.Foundation
{   
    internal sealed class DataStoreExistenceVerifierImpl : IDataStoreExistenceVerifier
    {
        // Interfaces in this list will have a store created on system start if they do not exists
        private static readonly List<Type> _interfaceTypes = new List<Type>
                {
                    typeof(ICompositionContainer),
                    typeof(IDataItemTreeAttachmentPoint),
                    typeof(IFlowInformation),
                    typeof(IFolderWhiteList),
                    typeof(IGeneratedTypeWhiteList),
                    typeof(IHostnameBinding),
                    typeof(IInlineFunction),
                    typeof(IInlineFunctionAssemblyReference),
                    typeof(ILockingInformation),
                    typeof(IMediaFile),
                    typeof(IMediaFileData),
                    typeof(IMediaFileFolder),
                    typeof(IMediaFolderData),
                    typeof(IMethodBasedFunctionInfo),
                    typeof(INamedFunctionCall),
                    typeof(IPackageServerSource),
                    typeof(IPage),
                    typeof(IPageFolderDefinition),
                    typeof(IPageMetaDataDefinition),
                    typeof(IPagePlaceholderContent),
                    typeof(IPagePublishSchedule),
                    typeof(IPageStructure),
                    typeof(IXmlPageTemplate),
                    typeof(IPageType),
                    typeof(IPageTypeDataFolderTypeLink),
                    typeof(IPageTypeDefaultPageContent),
                    typeof(IPageTypeMetaDataTypeLink),
                    typeof(IPageTypePageTemplateRestriction),
                    typeof(IPageTypeParentRestriction),
                    typeof(IPageTypeTreeLink),
                    typeof(IPageUnpublishSchedule),
                    typeof(IParameter),
                    typeof(ISearchEngineOptimizationKeyword),
                    typeof(ISqlConnection),
                    typeof(ISqlFunctionInfo),
                    typeof(ISystemActiveLocale),
                    typeof(ITaskItem),
                    typeof(IUrlConfiguration),
                    typeof(IUser),
                    typeof(IUserActiveLocale),
                    typeof(IUserActivePerspective),
                    typeof(IUserConsoleInformation),
                    typeof(IUserDeveloperSettings),
                    typeof(IUserGroup),
                    typeof(IUserGroupActivePerspective),
                    typeof(IUserGroupPermissionDefinition),
                    typeof(IUserGroupPermissionDefinitionPermissionType),
                    typeof(IUserPermissionDefinition),
                    typeof(IUserPermissionDefinitionPermissionType),
                    typeof(IUserSettings),
                    typeof(IUserUserGroupRelation),
                    typeof(IVisualFunction),
                    typeof(IXsltFunction)
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
            if (DataProviderPluginFacade.HasConfiguration())
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

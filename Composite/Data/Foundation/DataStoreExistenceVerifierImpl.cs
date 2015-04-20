using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation.PluginFacades;
using Composite.Data.Plugins.DataProvider.Runtime;
using Composite.Data.Types;
using Composite.Plugins.WebClient.SessionStateProviders.DefaultSessionStateProvider;


namespace Composite.Data.Foundation
{   
    internal sealed class DataStoreExistenceVerifierImpl : IDataStoreExistenceVerifier
    {
        private const string LogTitle = "DataStoreExistenceVerifier";

        // Interfaces in this list will have a store created on system start if they do not exists
        private static readonly List<Type> _interfaceTypes = new List<Type>
                {
                    typeof(ICompositionContainer),
                    typeof(ICustomFunctionCallEditorMapping),
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
                    typeof(IPageStructure),
                    typeof(IXmlPageTemplate),
                    typeof(IPageType),
                    typeof(IPageTypeDataFolderTypeLink),
                    typeof(IPageTypeDefaultPageContent),
                    typeof(IPageTypeMetaDataTypeLink),
                    typeof(IPageTypePageTemplateRestriction),
                    typeof(IPageTypeParentRestriction),
                    typeof(IPageTypeTreeLink),
                    typeof(IPublishSchedule),
                    typeof(IUnpublishSchedule),                    
                    typeof(IParameter),
                    typeof(ISearchEngineOptimizationKeyword),
                    typeof(ISessionStateEntry),
                    typeof(ISqlConnection),
                    typeof(ISqlFunctionInfo),
                    typeof(ISystemActiveLocale),
                    typeof(ITaskItem),
                    typeof(IUrlConfiguration),
                    typeof(IUser),
                    typeof(IUserPasswordHistory),
                    typeof(IUserActiveLocale),
                    typeof(IUserActivePerspective),
                    typeof(IUserConsoleInformation),
                    typeof(IUserDeveloperSettings),
                    typeof(IUserFormLogin),
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
            get { return _interfaceTypes; }
        }



        public bool EnsureDataStores()
        {
            if (!DataProviderPluginFacade.HasConfiguration())
            {
                Log.LogError(LogTitle, "Failed to load the configuration section '{0}' from the configuration", DataProviderSettings.SectionName);
                return false;
            }

            var typeDescriptors = new List<DataTypeDescriptor>();

            foreach (Type type in _interfaceTypes)
            {
                try
                {
                    if (!DataProviderRegistry.AllKnownInterfaces.Contains(type))
                    {
                        var dataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(type);

                        dataTypeDescriptor.Validate();

                        typeDescriptors.Add(dataTypeDescriptor);
                    }
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException(string.Format("Failed to validate type '{0}'", type), ex);
                }
            }

            if (typeDescriptors.Any())
            {
                DataProviderPluginFacade.CreateStores(DataProviderRegistry.DefaultDynamicTypeDataProviderName, typeDescriptors);

                string typeNames = string.Join(", ", typeDescriptors.Select(t => t.GetFullInterfaceName()));
                Log.LogVerbose(LogTitle, "Stores for the following data types were created: " + typeNames);
            }

            return typeDescriptors.Count > 0;
        }
    }
}

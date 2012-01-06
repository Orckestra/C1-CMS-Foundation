using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.Data.Transactions;
using Composite.Core.Types;
using Composite.C1Console.Workflow;
using Composite.C1Console.Users;


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EnableTypeLocalizationWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EnableTypeLocalizationWorkflow()
        {
            InitializeComponent();
        }



        private DataTypeDescriptor GetDataTypeDescriptor()
        {
            Type type;

            if ((this.EntityToken is Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AssociatedDataElementProviderHelperEntityToken) == true)
            {
                var castedEntityToken = this.EntityToken as Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AssociatedDataElementProviderHelperEntityToken;

                type = TypeManager.GetType(castedEntityToken.Payload);
            }
            else
            {
                GeneratedDataTypesElementProviderTypeEntityToken entityToken = (GeneratedDataTypesElementProviderTypeEntityToken)this.EntityToken;
                type = TypeManager.GetType(entityToken.SerializedTypeName);
            }

            Guid guid = type.GetImmutableTypeId();

            return DataMetaDataFacade.GetDataTypeDescriptor(guid);
        }



        private void LocalesExists(object sender, ConditionalEventArgs e)
        {
            e.Result = DataLocalizationFacade.ActiveLocalizationCultures.Any();
        }



        private void step1CodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            Dictionary<string, string> culturesDictionary = DataLocalizationFacade.ActiveLocalizationCultures.ToDictionary(f => f.Name, DataLocalizationFacade.GetCultureTitle);

            this.UpdateBinding("CultureName", (UserSettings.ForeignLocaleCultureInfo ?? UserSettings.ActiveLocaleCultureInfo).Name);
            this.UpdateBinding("CultureNameList", culturesDictionary);
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();

            // Making changes to type
            DataTypeDescriptor newDataTypeDescriptor = dataTypeDescriptor.Clone();
            newDataTypeDescriptor.AddSuperInterface(typeof(ILocalizedControlled));

            List<CultureInfo> localesToCopyTo = new List<CultureInfo>();
            if (ThereAreReferencesInLocalizedData())
            {
                localesToCopyTo.AddRange(DataLocalizationFacade.ActiveLocalizationCultures);
            }
            else
            {
                string cultureName = this.GetBinding<string>("CultureName");
                localesToCopyTo.Add(CultureInfo.CreateSpecificCulture(cultureName));
            }

            UpdateDataTypeDescriptor updateDataTypeDescriptor = new UpdateDataTypeDescriptor(dataTypeDescriptor, newDataTypeDescriptor, false)
            {
                LocalesToCopyTo = localesToCopyTo
            };

            GeneratedTypesFacade.UpdateType(updateDataTypeDescriptor);

            this.CloseCurrentView();
            this.CollapseAndRefresh();
        }

        private bool ThereAreReferencesInLocalizedData()
        {
            if (DataLocalizationFacade.ActiveLocalizationCultures.Count() == 1)
            {
                return false;
            }

            Type type = GetDataTypeDescriptor().GetInterfaceType();
            foreach (Type referencedType in type.GetRefereeTypes())
            {
                if (DataLocalizationFacade.IsLocalized(referencedType))
                {
                    return true;
                }
            }
            return false;
        }

        private void ThereAreReferencesInLocalizedData(object sender, ConditionalEventArgs e)
        {
            e.Result = ThereAreReferencesInLocalizedData();
        }
    }
}

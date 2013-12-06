using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Transactions;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core.Linq;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Transactions;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_GeneratedDataTypesElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    public sealed partial class LocalizeDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {

        public LocalizeDataWorkflow()
        {
            InitializeComponent();
        }



        private void ValidateLocalizeProcess(object sender, ConditionalEventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            ILocalizedControlled data = dataEntityToken.Data as ILocalizedControlled;

            IEnumerable<ReferenceFailingPropertyInfo> referenceFailingPropertyInfos = DataLocalizationFacade.GetReferencingLocalizeFailingProperties(data).Evaluate();

            if (referenceFailingPropertyInfos.Any(f => f.OptionalReferenceWithValue == false))
            {
                List<string> row = new List<string>();

                row.Add(Texts.LocalizeDataWorkflow_ShowError_Description);

                foreach (ReferenceFailingPropertyInfo referenceFailingPropertyInfo in referenceFailingPropertyInfos.Where(f => f.OptionalReferenceWithValue == false))
                {
                    row.Add(Texts.LocalizeDataWorkflow_ShowError_FieldErrorFormat( 
                        referenceFailingPropertyInfo.DataFieldDescriptor.Name, 
                        referenceFailingPropertyInfo.ReferencedType.GetTypeTitle(), 
                        referenceFailingPropertyInfo.OriginLocaleDataValue.GetLabel()));
                }

                List<List<string>> rows = new List<List<string>> { row };

                this.UpdateBinding("ErrorHeader", new List<string> { "Fields" });
                this.UpdateBinding("Errors", rows);

                e.Result = false;
            }
            else
            {
                e.Result = true;
            }
        }



        private void localizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            ILocalizedControlled data = dataEntityToken.Data as ILocalizedControlled;

            CultureInfo targetCultureInfo = UserSettings.ActiveLocaleCultureInfo;

            if (ExistsInLocale(data, targetCultureInfo))
            {
                string title = Texts.LocalizeDataWorkflow_ShowError_LayoutLabel;
                string description = Texts.LocalizeDataWorkflow_ShowError_AlreadyTranslated;

                var messageBox = new MessageBoxMessageQueueItem
                                     {
                                         DialogType = DialogType.Message,
                                         Message = description,
                                         Title = title
                                     };

                ConsoleMessageQueueFacade.Enqueue(messageBox, GetCurrentConsoleId());
                return;
            }

            IEnumerable<ReferenceFailingPropertyInfo> referenceFailingPropertyInfos = DataLocalizationFacade.GetReferencingLocalizeFailingProperties(data).Evaluate();

            IData newData;

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                data = data.GetTranslationSource();

                using (new DataScope(targetCultureInfo))
                {
                    newData = DataFacade.BuildNew(data.DataSourceId.InterfaceType);

                    data.ProjectedCopyTo(newData);

                    ILocalizedControlled localizedControlled = newData as ILocalizedControlled;
                    localizedControlled.SourceCultureName = targetCultureInfo.Name;

                    if (newData is IPublishControlled)
                    {
                        IPublishControlled publishControlled = newData as IPublishControlled;
                        publishControlled.PublicationStatus = GenericPublishProcessController.Draft;
                    }

                    foreach (ReferenceFailingPropertyInfo referenceFailingPropertyInfo in referenceFailingPropertyInfos)
                    {
                        PropertyInfo propertyInfo = data.DataSourceId.InterfaceType.GetPropertiesRecursively().Single(f => f.Name == referenceFailingPropertyInfo.DataFieldDescriptor.Name);
                        if (propertyInfo.PropertyType.IsGenericType &&
                            propertyInfo.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                        {
                            propertyInfo.SetValue(newData, null, null);
                        }
                        else if (propertyInfo.PropertyType == typeof(string))
                        {
                            propertyInfo.SetValue(newData, null, null);
                        }
                        else
                        {
                            propertyInfo.SetValue(newData, referenceFailingPropertyInfo.DataFieldDescriptor.DefaultValue.Value, null);
                        }
                    }

                    newData = DataFacade.AddNew(newData, false, false, true);
                }

                EntityTokenCacheFacade.ClearCache(data.GetDataEntityToken());
                EntityTokenCacheFacade.ClearCache(newData.GetDataEntityToken());

                transactionScope.Complete();
            }

            ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMesseges(newData.GetDataEntityToken());

            if (this.Payload == "Global")
            {
                this.ExecuteWorklow(newData.GetDataEntityToken(), typeof(EditDataWorkflow));
            }
            else if (this.Payload == "Pagefolder")
            {
                this.ExecuteWorklow(newData.GetDataEntityToken(), WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.EditAssociatedDataWorkflow"));
            }
        }

        private static bool ExistsInLocale(IData data, CultureInfo locale)
        {
            Type dataType = data.DataSourceId.InterfaceType;

            MethodInfo method = StaticReflection.GetGenericMethodInfo(a => DataFacade.GetDataFromOtherLocale((IData)null, null))
                                                .MakeGenericMethod(new[] { dataType });

            object result = method.Invoke(null, new object[] { data, locale });

            if (result == null) return false;

            var enumerable = result as IEnumerable<object>;
            Verify.IsNotNull(enumerable, "Enumeration expected");

            return enumerable.Any();
        }
    }
}
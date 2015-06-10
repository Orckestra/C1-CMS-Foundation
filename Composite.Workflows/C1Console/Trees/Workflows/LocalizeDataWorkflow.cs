using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Transactions;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Data.Transactions;
using Composite.Core.Types;
using Composite.C1Console.Users;
using Composite.C1Console.Security;


namespace Composite.C1Console.Trees.Workflows
{
    public sealed partial class LocalizeDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public LocalizeDataWorkflow()
        {
            InitializeComponent();
        }



        private void ValidateReferencingProperties(object sender, ConditionalEventArgs e)
        {
            var dataEntityToken = (DataEntityToken)this.EntityToken;
            var data = dataEntityToken.Data as ILocalizedControlled;

            IEnumerable<ReferenceFailingPropertyInfo> referenceFailingProperties = DataLocalizationFacade.GetReferencingLocalizeFailingProperties(data).Evaluate();

            if (referenceFailingProperties.Any(f => f.OptionalReferenceWithValue == false))
            {
                List<string> row = new List<string>();

                row.Add(StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "LocalizeData.ShowError.Description"));

                foreach (ReferenceFailingPropertyInfo referenceFailingPropertyInfo in referenceFailingProperties.Where(f => f.OptionalReferenceWithValue == false))
                {
                    row.Add(string.Format(StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "LocalizeData.ShowError.FieldErrorFormat"), referenceFailingPropertyInfo.DataFieldDescriptor.Name, referenceFailingPropertyInfo.ReferencedType.GetTypeTitle(), referenceFailingPropertyInfo.OriginLocaleDataValue.GetLabel()));
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



        private void localizeDataCodeActivity_Localize_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            ILocalizedControlled data = dataEntityToken.Data as ILocalizedControlled;

            CultureInfo targetCultureInfo = UserSettings.ActiveLocaleCultureInfo;

            if (ExistsInLocale(data, targetCultureInfo))
            {
                this.ShowMessage(
                    DialogType.Message,
                    StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "LocalizeData.ShowError.Layout.Label"),
                    StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "LocalizeData.ShowError.AlreadyTranslated")
                );

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

                    newData = DataFacade.AddNew(newData);
                }

                EntityTokenCacheFacade.ClearCache(data.GetDataEntityToken());
                EntityTokenCacheFacade.ClearCache(newData.GetDataEntityToken());

                transactionScope.Complete();
            }

            ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMesseges(newData.GetDataEntityToken(), 2);
        }



        private static bool ExistsInLocale(IData data, CultureInfo locale)
        {
            Type dataType = data.DataSourceId.InterfaceType;

            MethodInfo getDataFromOtherScopeMethodInfo = typeof(DataFacade).GetMethod("GetDataFromOtherLocale", BindingFlags.Public | BindingFlags.Static);

            MethodInfo genericMethod = getDataFromOtherScopeMethodInfo.MakeGenericMethod(new[] { dataType });

            object result = genericMethod.Invoke(null, new object[] { data, locale });

            if (result == null) return false;

            var enumerable = result as IEnumerable;
            Verify.IsNotNull(enumerable, "Enumeration expected");

            return enumerable.Cast<object>().Any();
        }
    }
}

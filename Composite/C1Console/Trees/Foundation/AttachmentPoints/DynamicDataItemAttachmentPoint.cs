using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using Composite.Data;
using Composite.C1Console.Security;
using Composite.Data.ProcessControlled;

namespace Composite.C1Console.Trees.Foundation.AttachmentPoints
{
    /// <summary>
    /// This class is used when the user adds trees dynamicly
    /// Used as a dual with Composite.Data.Types.IDataItemTreeAttachmentPoint
    /// </summary>    
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [DebuggerDisplay("DynamicDataItemAttachmentPoint. Type = '{InterfaceType}', Key = '{KeyValue}'")]
    public sealed class DynamicDataItemAttachmentPoint : BaseAttachmentPoint, IDataItemAttachmentPoint
    {
        /// <exclude />
        public Type InterfaceType { get; set; }

        /// <exclude />
        public object KeyValue { get; set; }


        /// <exclude />
        public override bool IsAttachmentPoint(EntityToken parentEntityToken)
        {
            DataEntityToken dataEntityToken = parentEntityToken as DataEntityToken;
            if (dataEntityToken == null) return false;

            if (dataEntityToken.InterfaceType != this.InterfaceType) return false;

            // The data item has not been localized, so down attach the tree.
            if (dataEntityToken.DataSourceId.LocaleScope.Equals(LocalizationScopeManager.CurrentLocalizationScope) == false) return false;

            object keyValue = dataEntityToken.DataSourceId.GetKeyValue();

            return object.Equals(keyValue, this.KeyValue);
        }


        /// <exclude />
        public override IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            if (typeof(ILocalizedControlled).IsAssignableFrom(this.InterfaceType))
            {
                foreach (CultureInfo cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures)
                {
                    using (new DataScope(cultureInfo))
                    {
                        EntityToken entityToken = GetEntityTokensImpl();
                        if (entityToken != null)
                        {
                            yield return entityToken;
                        }
                    }
                }
            }
            else
            {
                yield return GetEntityTokensImpl();
            }
        }



        private EntityToken GetEntityTokensImpl()
        {
            IData data = DataFacade.TryGetDataVersionsByUniqueKey(this.InterfaceType, KeyValue).FirstOrDefault();
            return data == null ? null : data.GetDataEntityToken();
        }


        /// <exclude />
        public override void Log(string title, string indention = "")
        {
            Core.Log.LogVerbose(title, string.Format("{0}DynamicDataType: Position = {1}, Type = {2}, KeyValue = {3}", indention, this.Position, this.InterfaceType, this.KeyValue));
        }
    }
}

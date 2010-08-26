using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Core.Logging;
using Composite.C1Console.Security;


namespace Composite.C1Console.Trees.Foundation.AttachmentPoints
{
    internal class DataItemAttachmentPoint : BaseAttachmentPoint, IDataItemAttachmentPoint
    {
        public Type InterfaceType { get; set; }


        public override bool IsAttachmentPoint(EntityToken parentEntityToken)
        {
            DataEntityToken dataEntityToken = parentEntityToken as DataEntityToken;
            if (dataEntityToken == null) return false;

            if (dataEntityToken.InterfaceType != this.InterfaceType) return false;

            return true;
        }



        public override IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            throw new NotImplementedException("This is prevented by validation");
            //if (typeof(ILocalizedControlled).IsAssignableFrom(this.InterfaceType))
            //{
            //    foreach (CultureInfo cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures)
            //    {
            //        using (new DataScope(cultureInfo))
            //        {
            //            EntityToken entityToken = GetEntityTokensImpl();
            //            if (entityToken != null)
            //            {
            //                yield return entityToken;
            //            }
            //        }
            //    }
            //}
            //else
            //{
            //    yield return GetEntityTokensImpl();
            //}            
        }



        private EntityToken GetEntityTokensImpl()
        {
            // Any data item will work, but if security is set on the first item, it will rule them alll......is this good?
            // This is no problem for Simple elements, but huge problem for data elements and data folder elements.
            // Should this be disallowed???
            IData data = DataFacade.GetData(this.InterfaceType).ToDataEnumerable().FirstOrDefault();
            if (data == null) return null;

            return data.GetDataEntityToken();
        }



        public override void Log(string title, string indention)
        {
            LoggingService.LogVerbose(title, string.Format("{0}DataType: Position = {1}, Type = {2}", indention, this.Position, this.InterfaceType));
        }
    }
}

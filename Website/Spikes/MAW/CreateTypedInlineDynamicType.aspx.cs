using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using System.Collections.Generic;
using Composite.Functions;
using Composite.Data.GeneratedTypes;
using Composite.Data;
using Composite.Transactions;
using Composite.Types;


public partial class Spikes_MAW_CreateInlineDynamicType : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        InlinePageDataDemo.InlinePageDataServices.CreateInlineType();

        //Type interfaceType = typeof(Xxx.IPageInlineSample);
        

        //// Page we add the data composition to
        //IPage targetData;
        //using (DataScope dataScope = new DataScope(DataScopeIdentifier.Administrated))
        //{
        //    targetData = DataFacade.GetData<IPage>(p => p.ParentId == Guid.Empty).FirstOrDefault();
        //}

        //if (targetData == null)
        //{
        //    Response.Write("No pages found!");
        //    return;
        //}

        //// The "fan" on page edit where users should edit the new type data ( Currently the "Meta data" fan)
        //Dictionary<Guid, string> compositionContainers = DataCompositionScopeRuleFacade.GetCompositionContainers();
        //Guid compositionContainerId = compositionContainers.First().Key;

        //DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);

        //if (DataFacade.GetAllInterfaces().Contains(interfaceType) == false)
        //{
        //    DynamicTypeManager.CreateStore(dataTypeDescriptor);
        //}

        //int compositionRuleNamesCount = DataCompositionScopeRuleFacade.GetAllCompositionRuleNames(typeof(IPage), interfaceType).Count();

        //if (compositionRuleNamesCount == 0)
        //{
        //    dataTypeDescriptor.Fields["Name"].FormRenderingProfile.Label = "Name";
        //    dataTypeDescriptor.Fields["Name"].FormRenderingProfile.HelpText = "Write the name here...";
        //    dataTypeDescriptor.Fields["Name"].FormRenderingProfile.WidgetFunctionMarkup = StandardWidgetFunctions.TextBoxWidget.SerializedWidgetFunction.ToString();


        //    // transaction control would be really well used here - consider introducing it.

        //    //using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
        //    //{
        //    DataCompositionScopeRule allRule = DataCompositionScopeRule.All(compositionContainerId, "AddressInfo", "Address info");

        //    // create a "composition rule"
        //    DataCompositionScopeRuleFacade.AddCompositionRule(targetData, interfaceType, allRule);          

        //    DynamicTypeManager.UpdateDataTypeDescriptor(dataTypeDescriptor, false);

        //    //    transactionScope.Complete();
        //    //}
        //}

        //Response.Write("Done");
    }


}

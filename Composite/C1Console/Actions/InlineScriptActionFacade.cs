using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.WebClient;
using Composite.C1Console.Events;
using Composite.Core.WebClient.FlowMediators;
using Composite.Core.WebClient.Services.TreeServiceObjects;
using Composite.Core.Serialization;
using Composite.C1Console.Elements;


namespace Composite.C1Console.Actions
{
#warning  MRJ: Part of API?
    public static class InlineScriptActionFacade
    {
        public static string GetInlineElementActionScriptCode(EntityToken entityToken, ActionToken actionToken)
        {
            return GetInlineElementActionScriptCode(entityToken, actionToken, new Dictionary<string, string>());
        }
       


        public static string GetInlineElementActionScriptCode(EntityToken entityToken, ActionToken actionToken, Dictionary<string, string> piggyBag)
        {
            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "EntityToken", EntityTokenSerializer.Serialize(entityToken, false));
            StringConversionServices.SerializeKeyValuePair(sb, "ActionToken", ActionTokenSerializer.Serialize(actionToken, true));
            StringConversionServices.SerializeKeyValuePair(sb, "PiggyBag", PiggybagSerializer.Serialize(piggyBag));

            string scriptAction = string.Format(@"SystemAction.invokeInlineAction(""{0}"");", Convert.ToBase64String(Encoding.UTF8.GetBytes(sb.ToString())));

            return scriptAction;
        }



        public static void ExecuteElementScriptAction(string serializedScriptAction, string consoleId)
        {
            string scriptAction = Encoding.UTF8.GetString(Convert.FromBase64String(serializedScriptAction));

            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(scriptAction);

            if ((dic["EntityToken"] == null) || (dic["ActionToken"] == null) || (dic["PiggyBag"] == null)) throw new ArgumentException("Wrong format", "serializedScriptAction");

            string serializedEntityToken = StringConversionServices.DeserializeValueString(dic["EntityToken"]);
            string serializedActionToken = StringConversionServices.DeserializeValueString(dic["ActionToken"]);
            string serializedPiggyBag = StringConversionServices.DeserializeValueString(dic["PiggyBag"]);

            TreeServicesFacade.ExecuteElementAction(
                "DUMMY",
                serializedEntityToken,
                serializedPiggyBag,
                serializedActionToken,
                consoleId);
        }
    }
}

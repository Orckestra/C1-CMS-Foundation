using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.Core.Serialization;


namespace Composite.Plugins.Elements.ElementProviders.AllFunctionsElementProvider
{
    [ActionExecutor(typeof(FunctionInfoActionExecutor))]
    internal sealed class FunctionInfoActionToken : ActionToken
    {
        private readonly IEnumerable<PermissionType> _permissionTypes = new[] { PermissionType.Add, PermissionType.Edit, PermissionType.Delete, PermissionType.Read, PermissionType.Administrate };

        public string FunctionName { get; private set; }
        public bool IsWidgetFunction { get; private set; }

        public FunctionInfoActionToken(string functionName, bool isWidgetFunction = false)
        {
            this.FunctionName = functionName;
            this.IsWidgetFunction = isWidgetFunction;
        }

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }


        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();
            StringConversionServices.SerializeKeyValuePair(sb, "Name", this.FunctionName);
            StringConversionServices.SerializeKeyValuePair(sb, "IsWidget", this.IsWidgetFunction);

            return sb.ToString();
        }



        public static ActionToken Deserialize(string serializedData)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedData);

            string name = StringConversionServices.DeserializeValueString(dic["Name"]);
            bool isWidget = StringConversionServices.DeserializeValueBool(dic["IsWidget"]);

            return new FunctionInfoActionToken(name, isWidget);
        }
    }
}

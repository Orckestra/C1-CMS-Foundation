using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Composite.Serialization;
using System.Collections.Generic;
using Composite.Types;
using System.Reflection;
using Composite.Security;
using System.Xml.Linq;
using System.Text;
using Composite.Data.Types;
using Composite.Data;

public partial class Spikes_RelationshipGraph_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["EntityToken"] == null)
        {
            RelationshipGraphHolder.Controls.Add(new LiteralControl("No entity token.... nothing to do.... STUPID!"));

            return;
        }

        string serializedEntityToken = Request.QueryString["EntityToken"];

        EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);

        RelationshipGraph graph = new RelationshipGraph(entityToken, RelationshipGraphSearchOption.Both);

        foreach (RelationshipGraphLevel level in graph.Levels)
        {
            if (level.AllEntities.Count() != 0)
            {
                RelationshipGraphHolder.Controls.Add(new LiteralControl(new XElement("h2", string.Format("Level {0}", level.Level)).ToString()));
            }

            foreach (EntityToken token in level.Entities)
            {
                PrettyPrintEntityToken(token, "red");
            }


            foreach (EntityToken token in level.HookedEntities)
            {
                PrettyPrintEntityToken(token, "green");
            }
        }
    }


    private void PrettyPrintEntityToken(EntityToken entityToken, string color)
    {
        List<object> idList = new List<object>();

        if (entityToken.Id.Contains("=") == true)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(entityToken.Id);

            idList.Add(new XElement("br"));

            foreach (KeyValuePair<string, string> kvp in dic)
            {
                idList.Add(new XElement("span", new XAttribute("style", "padding-left: 15px;"),
                               string.Format("{0} = {1}", kvp.Key, kvp.Value)));
                idList.Add(new XElement("br"));
            }

        }
        else
        {
            idList.Add(entityToken.Id);
        }










        List<object> usersermisstionsDefinedHere = new List<object>();
        List<object> currentUsersPermisstionTypes = new List<object>();

        string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

        IEnumerable<string> usernames = UserValidationFacade.AllUsernames;

        foreach (string username in usernames)
        {
            IEnumerable<PermissionType> permissionTypes = PermissionTypeFacade.GetLocallyDefinedPermissionTypes(new UserToken(username), entityToken);

            StringBuilder sb = new StringBuilder();
            foreach (PermissionType permissionType in permissionTypes)
            {
                if (sb.ToString() != "")
                {
                    sb.Append(", ");
                }

                sb.Append(new PermissionDescriptor(permissionType).Label);
            }

            usersermisstionsDefinedHere.Add(new XElement("span", new XAttribute("style", "padding-left: 15px;"), string.Format("{0} = {1}", username, sb.ToString())));
            usersermisstionsDefinedHere.Add(new XElement("br"));



            IEnumerable<PermissionType> currentPermissionTypes = PermissionTypeFacade.GetCurrentPermissionTypes(new UserToken(username), entityToken, PermissionTypeFacade.GetUserPermissionDefinitions(username));

            StringBuilder currentSb = new StringBuilder();
            foreach (PermissionType permissionType in currentPermissionTypes)
            {
                if (currentSb.ToString() != "")
                {
                    currentSb.Append(", ");
                }

                currentSb.Append(new PermissionDescriptor(permissionType).Label);
            }

            currentUsersPermisstionTypes.Add(new XElement("span", new XAttribute("style", "padding-left: 15px;"), string.Format("{0} = {1}", username, currentSb.ToString())));
            currentUsersPermisstionTypes.Add(new XElement("br"));
        }



        XElement element =
            new XElement("div", new XAttribute("style", string.Format("border:2px; border-style: solid; border-color: {0}; margin-bottom: 2px; margin-left:5px; margin-right:5px; padding: 3px;", color)),
                new XElement("b", "Runtime type: "),
                entityToken.GetType().ToString(),
                new XElement("br"),
                new XElement("b", "Hashcode: "),
                entityToken.GetHashCode().ToString(),
                new XElement("br"),
                new XElement("b", "Source: "),
                entityToken.Source,
                new XElement("br"),
                new XElement("b", "Type: "),
                entityToken.Type,
                new XElement("br"),
                new XElement("b", "Id: "),
                idList,
                new XElement("br"),
                new XElement("b", "Serialized entity token: "),
                serializedEntityToken,
                new XElement("br"),
                new XElement("b", "Users permissions defined here: "),
                usersermisstionsDefinedHere,
                new XElement("br"),
                new XElement("b", "Current users permissions here: "),
                currentUsersPermisstionTypes
            );

        RelationshipGraphHolder.Controls.Add(new LiteralControl(element.ToString()));
    }
}

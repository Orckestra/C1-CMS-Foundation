using System;
using System.Linq;
using System.Web.UI;
using Composite.Core.Serialization;
using System.Collections.Generic;
using Composite.C1Console.Security;
using System.Xml.Linq;
using Composite.Data.Types;
using Composite.Data;


public partial class Spikes_RelationshipGraph_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["EntityToken"] == null)
        {
            RelationshipGraphHolder.Controls.Add(new LiteralControl("No entity token.... nothing to do...."));

            return;
        }

        string serializedEntityToken = Request.QueryString["EntityToken"];

        EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);
        //Composite.Core.WebClient.ElementInformation elementInformation = ElementInformationSerializer.Deserialize(serializedEntityToken);

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

    private void AddPersissionsLine(List<object> elements, string entity, IEnumerable<PermissionType> permissions)
    {
        var permissionLabels = permissions.Select(p => new PermissionDescriptor(p).Label).OrderBy(l => l).ToList();

        if (permissionLabels.Count == 0) return;

        elements.Add(new XElement("span", 
                        new XAttribute("style", "padding-left: 15px;"),
                        entity + " = " + string.Join(", ", permissionLabels)));
        elements.Add(new XElement("br"));
    }


    private void PrettyPrintEntityToken(EntityToken entityToken, string color)
    {
        var idList = new List<object>();

        if (entityToken.Id.Contains("="))
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(entityToken.Id);

            idList.Add(new XElement("br"));

            foreach (KeyValuePair<string, string> kvp in dic)
            {
                idList.Add(new XElement("span", new XAttribute("style", "padding-left: 15px; color: " + color),
                    string.Format("{0} = {1}", kvp.Key, kvp.Value)));
                idList.Add(new XElement("br"));
            }
        }
        else
        {
            idList.Add(entityToken.Id);
        }


        var userPermissionsDefinedHere = new List<object>();
        var currentUsersPermissionTypes = new List<object>();

        string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

        var usernames = UserValidationFacade.AllUsernames.OrderBy(u => u).ToList();

        foreach (string username in usernames)
        {
            IEnumerable<PermissionType> userPermissionTypes = PermissionTypeFacade.GetLocallyDefinedUserPermissionTypes(
                new UserToken(username), entityToken);

            AddPersissionsLine(userPermissionsDefinedHere, username, userPermissionTypes);

            var currentPermissionTypes = PermissionTypeFacade.GetCurrentPermissionTypes(
                new UserToken(username), entityToken, 
                PermissionTypeFacade.GetUserPermissionDefinitions(username), 
                PermissionTypeFacade.GetUserGroupPermissionDefinitions(username));

            AddPersissionsLine(currentUsersPermissionTypes, username, currentPermissionTypes);
        }


        var userGroupPermissionsDefinedHere = new List<object>();
        var inheritedGroupPermissions = new List<object>();

        var userGroups = DataFacade.GetData<IUserGroup>().OrderBy(ug => ug.Name).ToList();
        foreach (IUserGroup userGroup in userGroups)
        {
            var userGroupPermissionTypes = PermissionTypeFacade.GetLocallyDefinedUserGroupPermissionTypes(userGroup.Id, entityToken);

            AddPersissionsLine(userGroupPermissionsDefinedHere, userGroup.Name, userGroupPermissionTypes);

            IEnumerable<PermissionType> inheritedUserGroupPermissionTypes = PermissionTypeFacade.GetInheritedGroupPermissionsTypes(userGroup.Id, entityToken);

            AddPersissionsLine(inheritedGroupPermissions, userGroup.Name, inheritedUserGroupPermissionTypes);
        }



        var element =
            new XElement("div",
                new XAttribute("style",
                    string.Format(
                        "border:2px; border-style: solid; border-color: {0}; margin-bottom: 2px; margin-left:5px; margin-right:5px; padding: 3px;",
                        color)),
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
                new XElement("br"));


        if (currentUsersPermissionTypes.Any())
        {
            element.Add(
                new XElement("b", "Resolved users permissions here: "),
                new XElement("br"),
                currentUsersPermissionTypes,
                new XElement("br"));
        }


        if (userPermissionsDefinedHere.Any())
        {
            element.Add(
                new XElement("b", "Users permissions defined here: "),
                new XElement("br"),
                userPermissionsDefinedHere,
                new XElement("br"));
        }

        if (inheritedGroupPermissions.Any())
        {
            element.Add(
                new XElement("b", "Inherted user group permissions: "),
                new XElement("br"),
                inheritedGroupPermissions,
                new XElement("br"));
        }

        if (userGroupPermissionsDefinedHere.Any())
        {
            element.Add(
                new XElement("b", "User group permissions defined here: "),
                new XElement("br"),
                userGroupPermissionsDefinedHere,
                new XElement("br"));
        }


        RelationshipGraphHolder.Controls.Add(new LiteralControl(element.ToString()));
    }
}

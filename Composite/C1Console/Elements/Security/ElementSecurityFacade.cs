//#warning REMARK THIS!!!
//#define NO_SECURITY
using System;
using System.Collections.Generic;
using Composite.C1Console.Security;
using Composite.Core.Logging;
using Composite.Plugins.Elements.ElementProviders.PageElementProvider;


namespace Composite.C1Console.Elements.Security
{
    internal static class ElementSecurityFacade
    {
        public static IEnumerable<Element> FilterActions(this IEnumerable<Element> elements)
        {
            if (elements == null) throw new ArgumentNullException("elements");

#if NO_SECURITY
                return elements;
#else
            UserToken userToken = UserValidationFacade.GetUserToken();

            IEnumerable<UserPermissionDefinition> userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(userToken.Username);
            IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinition = PermissionTypeFacade.GetUserGroupPermissionDefinitions(userToken.Username);

            foreach (Element element in elements)
            {
                if (PermissionTypeFacade.IsSubBrachContainingPermissionTypes(userToken, element.ElementHandle.EntityToken, userPermissionDefinitions, userGroupPermissionDefinition) == true)
                {

                    List<ElementAction> actionsToRemove = new List<ElementAction>();
                    foreach (ElementAction elementAction in element.Actions)
                    {
                        if (SecurityResolver.Resolve(userToken, elementAction.ActionHandle.ActionToken, element.ElementHandle.EntityToken, userPermissionDefinitions, userGroupPermissionDefinition) == SecurityResult.Disallowed)
                        {
                            actionsToRemove.Add(elementAction);
                        }
                    }

                    foreach (ElementAction elementAction in actionsToRemove)
                    {
                        element.RemoveAction(elementAction);
                    }

                    // Drag & drop security
                    if (element.MovabilityInfo != null)
                    {
                        if (SecurityResolver.Resolve(userToken, new DragAndDropActionToken(), element.ElementHandle.EntityToken, userPermissionDefinitions, userGroupPermissionDefinition) == SecurityResult.Disallowed)
                        {
                            element.RemoveMovabilityInfo();
                        }
                    }

                    yield return element;
                }
            }
#endif
        }
    }
}

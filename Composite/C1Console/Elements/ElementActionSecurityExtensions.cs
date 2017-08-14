//#warning REMARK THIS!!!
//#define NO_SECURITY
using System;
using System.Collections.Generic;
using Composite.C1Console.Security;
using Composite.Core.Linq;
using Composite.Plugins.Elements.ElementProviders.PageElementProvider;


namespace Composite.C1Console.Elements
{
    /// <summary>
    /// Extension methods related to security on element actions.
    /// </summary>
    public static class ElementActionSecurityExtensions
    {
        /// <summary>
        /// Will filter actions (according to current users permissions) attached on the elements
        /// </summary>
        /// <param name="elements">Elements to filder</param>
        /// <returns>New sequence of elements, with actions filtered</returns>
        public static IEnumerable<Element> FilterElementsAndActions(this IEnumerable<Element> elements)
        {
            Verify.ArgumentNotNull(elements, nameof(elements));

#if NO_SECURITY
                return elements;
#else
            UserToken userToken = UserValidationFacade.GetUserToken();

            var userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(userToken.Username).Evaluate();
            var userGroupPermissionDefinition = PermissionTypeFacade.GetUserGroupPermissionDefinitions(userToken.Username).Evaluate();

            return elements
                .FilterElements(userToken, userPermissionDefinitions, userGroupPermissionDefinition)
                .FilterActions(userToken, userPermissionDefinitions, userGroupPermissionDefinition);
#endif
        }

        internal static IEnumerable<Element> FilterElements(this IEnumerable<Element> elements)
        {
#if NO_SECURITY
                return elements;
#endif

            var userToken = UserValidationFacade.GetUserToken();

            var userPermissions = PermissionTypeFacade.GetUserPermissionDefinitions(userToken.Username).Evaluate();
            var userGroupPermissions = PermissionTypeFacade.GetUserGroupPermissionDefinitions(userToken.Username).Evaluate();

            return FilterElements(elements, userToken, userPermissions, userGroupPermissions);
        }

        internal static IEnumerable<Element> FilterElements(this IEnumerable<Element> elements,
            UserToken userToken,
            ICollection<UserPermissionDefinition> userPermissionDefinitions,
            ICollection<UserGroupPermissionDefinition> userGroupPermissionDefinition)
        {
            Verify.ArgumentNotNull(elements, nameof(elements));

#if NO_SECURITY
                return elements;
#else
            foreach (Element element in elements)
            {
                if (PermissionTypeFacade.IsSubBrachContainingPermissionTypes(userToken,
                    element.ElementHandle.EntityToken, userPermissionDefinitions, userGroupPermissionDefinition))
                {
                    yield return element;
                }
            }
#endif
        }


        internal static IEnumerable<Element> FilterActions(this IEnumerable<Element> elements)
        {
#if NO_SECURITY
                return elements;
#endif

            var userToken = UserValidationFacade.GetUserToken();

            var userPermissions = PermissionTypeFacade.GetUserPermissionDefinitions(userToken.Username).Evaluate();
            var userGroupPermissions = PermissionTypeFacade.GetUserGroupPermissionDefinitions(userToken.Username).Evaluate();

            return FilterActions(elements, userToken, userPermissions, userGroupPermissions);
        }


        internal static IEnumerable<Element> FilterActions(this IEnumerable<Element> elements,
            UserToken userToken,
            ICollection<UserPermissionDefinition> userPermissionDefinitions,
            ICollection<UserGroupPermissionDefinition> userGroupPermissionDefinition)
        {
            Verify.ArgumentNotNull(elements, nameof(elements));

#if NO_SECURITY
                return elements;
#else
            foreach (var element in elements)
            {
                var actionsToRemove = new List<ElementAction>();
                foreach (ElementAction elementAction in element.Actions)
                {
                    if (SecurityResolver.Resolve(userToken, elementAction.ActionHandle.ActionToken,
                            element.ElementHandle.EntityToken, userPermissionDefinitions,
                            userGroupPermissionDefinition) == SecurityResult.Disallowed)
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
                    if (SecurityResolver.Resolve(userToken, new DragAndDropActionToken(),
                            element.ElementHandle.EntityToken, userPermissionDefinitions,
                            userGroupPermissionDefinition) == SecurityResult.Disallowed)
                    {
                        element.RemoveMovabilityInfo();
                    }
                }

                yield return element;
            }
#endif
        }
    }
}
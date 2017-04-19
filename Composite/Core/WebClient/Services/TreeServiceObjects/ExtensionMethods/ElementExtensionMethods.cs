using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.Core.Types;


namespace Composite.Core.WebClient.Services.TreeServiceObjects.ExtensionMethods
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ElementExtensionMethods
    {
        /// <exclude />
        public static ClientElement GetClientElement(this Element element)
        {
            if (element.VisualData.Icon == null || element.Actions.Any(a => a.VisualData?.Icon == null))
            {
                throw new InvalidOperationException($"Unable to create ClientElement from Element with entity token '{element.ElementHandle.EntityToken.Serialize()}'. The element or one of its actions is missing an icon definition.");
            }

            string entityToken = EntityTokenSerializer.Serialize(element.ElementHandle.EntityToken, true);

            string piggyBag = element.ElementHandle.SerializedPiggyback;
            
            var clientElement = new ClientElement
                   {
                       ElementKey = $"{element.ElementHandle.ProviderName}{entityToken}{piggyBag}", 
                       ProviderName = element.ElementHandle.ProviderName,
                       EntityToken = entityToken,
                       Piggybag = piggyBag,
                       PiggybagHash = HashSigner.GetSignedHash(piggyBag).Serialize(),
                       Label = element.VisualData.Label,
                       HasChildren = element.VisualData.HasChildren,
                       IsDisabled = element.VisualData.IsDisabled,
                       Icon = element.VisualData.Icon,
                       OpenedIcon = element.VisualData.OpenedIcon,
                       ToolTip = element.VisualData.ToolTip,
                       Actions = element.Actions.ToClientActionList(),
                       PropertyBag = element.PropertyBag.ToClientPropertyBag(),
                       TagValue = element.TagValue,
                       ContainsTaggedActions = element.Actions.Any(f => f.TagValue != null),
                       TreeLockEnabled = element.TreeLockBehavior == TreeLockBehavior.Normal,
                       ElementBundle = element.VisualData.ElementBundle,
                       BundleElementName = element.VisualData.BundleElementName
                   };

            clientElement.ActionKeys =
                (from clientAction in clientElement.Actions
                 select clientAction.ActionKey).ToList();

            if (element.MovabilityInfo.DragType != null) clientElement.DragType = element.MovabilityInfo.GetHashedTypeIdentifier();

            List<string> apoptables = element.MovabilityInfo.GetDropHashTypeIdentifiers();
            if (apoptables != null && apoptables.Count > 0)
            {
                clientElement.DropTypeAccept = apoptables;
            }

            clientElement.DetailedDropSupported = element.MovabilityInfo.SupportsIndexedPosition;

            return clientElement;
        }



        /// <exclude />
        public static List<ClientElement> ToClientElementList(this List<Element> elements)
        {
            var list = new List<ClientElement>(elements.Count);
            list.AddRange(elements.Select(element => element.GetClientElement()));

            return list;
        }



        /// <exclude />
        public static List<KeyValuePair> ToClientPropertyBag(this Dictionary<string, string> propertyBag)
        {
            if (propertyBag == null || propertyBag.Count == 0) return null;

            return propertyBag.Select(kvp => new KeyValuePair(kvp.Key, kvp.Value)).ToList();
        }

    }
}

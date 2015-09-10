using System;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.IO;
using System.Collections.Generic;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class XElementUtils
    {
        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        /// <param name="inputUri">This could be a file or a url</param>
        public static XElement Load(string inputUri)
        {
            XElement element;

            using (Stream stream = UriResolver.GetStream(inputUri))
            {
                element = XElement.Load(stream);
            }

            return element;
        }



        /// <summary>
        /// This should be a part of the I/O layer
        /// </summary>
        public static void SaveToPath(this XElement element, string fileName)
        {
            using (var stream = new C1FileStream(fileName, FileMode.Create, FileAccess.Write))
            {                
                element.Save(stream);
            }
        }



        /// <exclude />
        public static bool HasSameSiblings(this XElement element)
        {
            if (element == null) throw new ArgumentNullException("element");

            if (element.Parent == null) return false;

            return element.Parent.Elements().Count(f => f.Name == element.Name) > 1;
        }



        /// <exclude />
        public static int GetSameSiblingsBeforeCount(this XElement element)
        {
            if (element == null) throw new ArgumentNullException("element");

            return element.NodesBeforeSelf().Count(f => f is XElement && ((XElement)f).Name == element.Name);
        }


        /// <summary>
        /// Returns the value of the XElement attribute with the specified name. 
        /// </summary>
        /// <param name="element"></param>
        /// <param name="attributeName">The name of the attribute to (try to) get</param>
        /// <returns>The value of the attribute or null if the attribute does not exist.</returns>
        public static string GetAttributeValue(this XElement element, string attributeName)
        {
            if (element == null) throw new ArgumentNullException("element");
            if (string.IsNullOrEmpty(attributeName)) throw new ArgumentNullException("attributeName");

            return GetAttributeValue(element, (XName)attributeName);
        }


        /// <summary>
        /// Returns the value of the XElement attribute with the specified name.
        /// </summary>
        /// <param name="element">The element.</param>
        /// <param name="attributeXName">XName of the attribute.</param>
        /// <returns>
        /// The value of the attribute or null if the attribute does not exist.
        /// </returns>
        public static string GetAttributeValue(this XElement element, XName attributeXName)
        {
            Verify.ArgumentNotNull(element, "element");
            Verify.ArgumentNotNull(attributeXName, "attributeXName");

            return  (string) element.Attribute(attributeXName);
        }



        /// <summary>
        /// Merge in elements and attributes. New child elements and new attributes are imported to the source. Conflicts are ignored (not merged).
        /// </summary>
        /// <param name="source">the structure to add new elements and attributes to</param>
        /// <param name="toBeImported">what to import</param>
        /// <returns>The modified source.</returns>
        public static XElement ImportSubtree(this XElement source, XElement toBeImported)
        {
            if (toBeImported != null)
            {
                foreach (XAttribute targetAttribute in from targetAttribute in toBeImported.Attributes() let sourceAttribute = source.Attribute(targetAttribute.Name) where sourceAttribute == null select targetAttribute)
                {
                    source.Add(targetAttribute);
                }

                foreach (XElement targetChild in toBeImported.Elements())
                {
                    XElement sourceChild = FindElement(source, targetChild);

                    if (sourceChild != null && !HasConflict(sourceChild, targetChild))
                    {
                        sourceChild.ImportSubtree(targetChild);
                    }
                    else
                    {
                        if (targetChild.Name.LocalName == "configSections")
                        {
                            source.AddFirst(targetChild);
                        }
                        else
                        {
                            source.Add(targetChild);
                        }
                    }
                }
            }

            return source;
        }


        /// <summary>
        /// Removes attributes and child elements from source which match ditto 100% in tatoBeExcludedget. Elements in source which has other child elements or attributes are not removed.
        /// </summary>
        /// <param name="source">XElement to modify</param>
        /// <param name="toBeExcluded">what to locate and remove</param>
        /// <returns>The modified source.</returns>
        public static XElement RemoveMatches(this XElement source, XElement toBeExcluded)
        {
            if (toBeExcluded != null)
            {
                foreach (XAttribute a in source.Attributes().Where(a => toBeExcluded.GetAttributeValue(a.Name) == a.Value).ToList())
                {
                    a.Remove();
                }

                foreach (XElement sourceChild in source.Elements().ToList())
                {
                    XElement targetChild = FindElement(toBeExcluded, sourceChild);
                    if (targetChild != null && !HasConflict(sourceChild, targetChild))
                    {
                        RemoveMatches(sourceChild, targetChild);

                        if (!sourceChild.HasAttributes && !sourceChild.HasElements)
                        {
                            sourceChild.Remove();
                            targetChild.Remove();
                        }
                    }
                }
            }

            return source;
        }



        private static bool HasConflict(XElement source, XElement target)
        {
            foreach (XAttribute targetAttribute in target.Attributes())
            {
                string sourceAttributeValue = source.GetAttributeValue(targetAttribute.Name);
                if (sourceAttributeValue != null && sourceAttributeValue != targetAttribute.Value)
                {
                    return true;
                }
            }

            return false;
        }



        private static int CountEquals(XElement target, XElement left, XElement right)
        {
            int leftEqualsCount = CountEquals(left, target, IsAttributeEqual);
            int rightEqualsCount = CountEquals(right, target, IsAttributeEqual);

            if (leftEqualsCount == rightEqualsCount)
            {
                int leftNameMatches = CountEquals(left, target, (a, b) => a.Name == b.Name);
                int rightNameMatches = CountEquals(right, target, (a, b) => a.Name == b.Name);

                return rightNameMatches.CompareTo(leftNameMatches);
            }

            return rightEqualsCount.CompareTo(leftEqualsCount);
        }



        private static int CountEquals(XElement left, XElement right, Func<XAttribute, XAttribute, bool> equal)
        {
            IEnumerable<XAttribute> equals = from l in left.Attributes()
                                             from r in right.Attributes()
                                             where equal(l, r)
                                             select l;
            return equals.Count();
        }



        private static bool IsAttributeEqual(XAttribute source, XAttribute target)
        {
            if (source == null && target == null)
            {
                return true;
            }

            if (source == null || target == null)
            {
                return false;
            }

            return source.Name == target.Name && source.Value == target.Value;
        }



        private static XElement FindElement(XElement source, XElement target)
        {
            List<XElement> sourceElements = source.Elements(target.Name).ToList();

            sourceElements.Sort((l, r) => CountEquals(target, l, r));

            return sourceElements.FirstOrDefault();
        }

    }
}

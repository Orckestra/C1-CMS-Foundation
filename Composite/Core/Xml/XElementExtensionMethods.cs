using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Xml.Linq;

namespace Composite.Core.Xml
{
	/// <summary>    
	/// </summary>
	/// <exclude />
	[System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class XElementExtensions
	{
		/// <exclude />
		public static XElement Exclude(this XElement source, XElement target)
		{
			if (target != null)
			{
				IEnumerable<XAttribute> attributesToRemove = source.Attributes().Where(e => IsAttributeEqual(e, target.Attribute(e.Name)));

				foreach (XAttribute a in attributesToRemove.ToList())
				{
					a.Remove();
				}

				foreach (XElement sourceChild in source.Elements().ToList())
				{
					XElement targetChild = FindElement(target, sourceChild);
					if (targetChild != null && !HasConflict(sourceChild, targetChild))
					{
						Exclude(sourceChild, targetChild);
						bool hasContent = sourceChild.HasAttributes || sourceChild.HasElements;

						if (!hasContent)
						{
							sourceChild.Remove();
							targetChild.Remove();
						}
					}
				}
			}
			return source;
		}

		/// <exclude />
		public static XElement Merge(this XElement source, XElement target)
		{
			if (target != null)
			{
				foreach (XAttribute targetAttribute in from targetAttribute in target.Attributes() let sourceAttribute = source.Attribute(targetAttribute.Name) where sourceAttribute == null select targetAttribute)
				{
					source.Add(targetAttribute);
				}

				foreach (XElement targetChild in target.Elements())
				{
					XElement sourceChild = FindElement(source, targetChild);
					if (sourceChild != null && !HasConflict(sourceChild, targetChild))
					{
						sourceChild.Merge(targetChild);
					}
					else
					{
						source.Add(targetChild);
					}
				}
			}

			return source;
		}

		private static bool HasConflict(XElement source, XElement target)
		{
			Dictionary<XName, string> sourceAttributes = source.Attributes().ToDictionary(a => a.Name, a => a.Value);

			foreach (XAttribute targetAttribute in target.Attributes())
			{
				string sourceValue;

				if (sourceAttributes.TryGetValue(targetAttribute.Name, out sourceValue) && sourceValue != targetAttribute.Value)
				{
					return true;
				}
			}

			return false;
		}

		private static int CountEquals(XElement target, XElement left, XElement right)
		{
			Debug.Assert(left.Name == right.Name);

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

			sourceElements.Sort((a, b) => CountEquals(target, a, b));

			return sourceElements.FirstOrDefault();
		}
	}
}

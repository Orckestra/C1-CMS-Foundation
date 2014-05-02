using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.Data.DynamicTypes.Configuration;

namespace Composite.Data.DynamicTypes
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class DataTypeIndex
    {
        private string _toString;

        /// <exclude />
        public DataTypeIndex(IReadOnlyCollection<Tuple<string, IndexDirection>> fields)
        {
            Fields = fields;
        }

        /// <summary>
        /// Gets the list of fields
        /// </summary>
        public IReadOnlyCollection<Tuple<string, IndexDirection>> Fields
        {
            get; private set;
        }

        /// <summary>
        /// Defines whether current index is clustered. Only one index per data type can be choosen as clustered.
        /// </summary>
        public bool Clustered { get; set; }

        /// <exclude />
        public override string ToString()
        {
            if (_toString == null)
            {
                var sb = new StringBuilder().Append("Index");
                if (Clustered)
                {
                    sb.Append(", Clustered");
                }
                sb.Append(": ");

                bool first = true;
                foreach (var field in Fields)
                {
                    if (!first)
                    {
                        sb.Append(", ");
                    }

                    sb.Append("{").Append(field.Item1).Append(", ").Append(field.Item2).Append("}");

                    first = false;
                }
                _toString = sb.ToString();
            }

            return _toString;
        }

        /// <summary>
        /// Serializes data type index into an XElement
        /// </summary>
        /// <returns></returns>
        public XElement ToXml()
        {
            return new XElement("Index",
                Clustered ? new XAttribute("clustered", true) : null,
                new XElement("Fields", 
                                Fields.Select(f => new XElement("Field",
                                    new XAttribute("name", f.Item1),
                                    new XAttribute("direction", f.Item2)))));
        }

        /// <summary>
        /// Deserializes a <see cref="DataTypeIndex"/>
        /// </summary>
        /// <param name="element"></param>
        /// <returns></returns>
        public static DataTypeIndex FromXml(XElement element)
        {
            var clusteredAttribute = element.Attribute("clustered");
            bool isClustered = clusteredAttribute != null && (bool) clusteredAttribute;

            var fieldsElement = element.Element("Fields");
            Verify.IsNotNull(fieldsElement, "'Fields' element is missing");

            var fields = new List<Tuple<string, IndexDirection>>();
            foreach (var field in fieldsElement.Elements("Field"))
            {
                string fieldName = field.GetRequiredAttributeValue("name");
                var direction = (IndexDirection)Enum.Parse(typeof(IndexDirection), field.GetRequiredAttributeValue("direction"));
                fields.Add(new Tuple<string, IndexDirection>(fieldName, direction));
            }

            return new DataTypeIndex(fields) { Clustered = isClustered };
        }
    }
}

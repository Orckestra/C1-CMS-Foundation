using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Elements
{
    public class LabeledPropertyList : IEnumerable<LabeledProperty>
    {
        private List<LabeledProperty> _list = new List<LabeledProperty>();


        public void Add(string name, string value)
        {
            _list.Add(new LabeledProperty(name, value));
        }


        public void Add(string name, object value)
        {
            _list.Add(new LabeledProperty(name, value.ToString()));
        }


        public void Add(string name, string label, string value)
        {
            _list.Add(new LabeledProperty(name, label, value));
        }

        public void Add(string name, string label, object value)
        {
            _list.Add(new LabeledProperty(name, label, value.ToString()));
        }

        public IEnumerator<LabeledProperty> GetEnumerator()
        {
            return _list.GetEnumerator();
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return _list.GetEnumerator();
        }
    }
}

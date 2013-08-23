using System;
using System.Collections;
using System.Reflection;
using System.Web;
using System.Web.WebPages;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Replaces HttpContext.Items collection, with a custom one, that allows WebPage-s to have own execution stacks, allowing them to be executed in parallel.
    /// </summary>
    internal class CustomHttpContextWrapper: HttpContextWrapper
    {
        private readonly IDictionary _items;

        public CustomHttpContextWrapper(HttpContext context): base(context)
        {
            _items = new FixedItemsCollection(context.Items);
        }

        public override System.Collections.IDictionary Items
        {
            get
            {
                return _items;
            }
        }


        private class FixedItemsCollection: IDictionary
        {
            private readonly IDictionary _innerDictionary;
            private static readonly object _webPageStackKey;

            private object _templateStack;

            static FixedItemsCollection()
            {
                _webPageStackKey = typeof (TemplateStack).GetField("_contextKey", BindingFlags.NonPublic | BindingFlags.Static).GetValue(null);
            }

            public FixedItemsCollection(IDictionary innerDictionary)
            {
                _innerDictionary = innerDictionary;
            }

            public void Add(object key, object value)
            {
                if (key == _webPageStackKey)
                {
                    _templateStack = value;
                    return;
                }

                _innerDictionary.Add(key, value);
            }

            public void Clear()
            {
                throw new NotSupportedException();
            }

            public bool Contains(object key)
            {
                if (key == _webPageStackKey)
                {
                    return _templateStack != null;
                }

                return _innerDictionary.Contains(key);
            }

            public IDictionaryEnumerator GetEnumerator()
            {
                return _innerDictionary.GetEnumerator();
            }

            public bool IsFixedSize
            {
                get { return _innerDictionary.IsFixedSize; }
            }

            public bool IsReadOnly
            {
                get { return _innerDictionary.IsReadOnly; }
            }

            public ICollection Keys
            {
                get { return _innerDictionary.Keys; }
            }

            public void Remove(object key)
            {
                if (key == _webPageStackKey)
                {
                    _templateStack = null;
                    return;
                }

                _innerDictionary.Remove(_templateStack);
            }

            public ICollection Values
            {
                get { return _innerDictionary.Values; }
            }

            public object this[object key]
            {
                get
                {
                    if (key == _webPageStackKey)
                    {
                        return _templateStack;
                    }

                    return _innerDictionary[key];
                }
                set
                {
                    if (key == _webPageStackKey)
                    {
                        _templateStack = value;
                        return;
                    }

                    _innerDictionary[key] = value;
                }
            }

            public void CopyTo(Array array, int index)
            {
                _innerDictionary.CopyTo(array, index);
            }

            public int Count
            {
                get { return _innerDictionary.Count; }
            }

            public bool IsSynchronized
            {
                get { return _innerDictionary.IsSynchronized; }
            }

            public object SyncRoot
            {
                get { return _innerDictionary.SyncRoot; }
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                return _innerDictionary.GetEnumerator();
            }
        }
    }
}

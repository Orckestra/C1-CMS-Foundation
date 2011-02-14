using System.Collections.Generic;
using System.Text;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class EntityTokenHtmlPrettyfierHelper
    {
        private StringBuilder _stringBuilder = new StringBuilder();


        /// <exclude />
        public void StartTable()
        {
            _stringBuilder.AppendLine(@"<table style=""empty-cells: show; padding: 10px; margin: 10px; border-collapse: collapse; border: 1px solid black;"">");
        }

        /// <exclude />
        public void EndTable()
        {
            _stringBuilder.AppendLine(@"</table>");
        }


        /// <exclude />
        public void StartRow()
        {
            _stringBuilder.AppendLine(@"<tr style=""padding: 0px; margin: 0px; border: 1px solid black;"">");
        }


        /// <exclude />
        public void EndRow()
        {
            _stringBuilder.AppendLine(@"</tr>");
        }


        /// <exclude />
        public void AddCell(string value)
        {
            AddCell(value, 1);
        }


        /// <exclude />
        public void AddCell(string value, int colspan, string backgroundColor = "#ffffff")
        {
            _stringBuilder.AppendLine(string.Format(@"<td colspan=""{0}"" style=""background-color: {1}; vertical-align: top; border: 1px solid black; padding: 2px; margin: 0px;"">{2}</td>", colspan, backgroundColor, value));
        }


        /// <exclude />
        public void AddFullRow(IEnumerable<string> values)
        {
            StartRow();

            foreach (string value in values)
            {
                AddCell(value);
            }

            EndRow();
        }


        /// <exclude />
        public void AddHeading(string value)
        {
            StartRow();

            _stringBuilder.AppendLine(string.Format(@"<td colspan=""2"" style=""vertical-align: top; border: 1px solid black; padding: 6px; margin: 0px; font-size: 110%"">{0}</td>", value));

            EndRow();
        }


        /// <exclude />
        public string GetResult()
        {
            return _stringBuilder.ToString();
        }
    }
}

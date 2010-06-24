using System.Collections;
using System.Collections.Generic;


namespace Composite.Security.Foundation
{
    internal sealed class RelationshipGraphLevelEnumerable : IEnumerable<RelationshipGraphLevel>
    {
        private RelationshipGraph _relationshipGraph;

        internal RelationshipGraphLevelEnumerable(RelationshipGraph relationshipGraph)
        {
            _relationshipGraph = relationshipGraph;
        }


        public IEnumerator<RelationshipGraphLevel> GetEnumerator()
        {
            return new RelationshipGraphLevelEnumerator(_relationshipGraph);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return new RelationshipGraphLevelEnumerator(_relationshipGraph);
        }
    }
}

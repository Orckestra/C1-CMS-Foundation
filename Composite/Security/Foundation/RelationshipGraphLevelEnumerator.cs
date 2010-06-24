using System.Collections;
using System.Collections.Generic;


namespace Composite.Security.Foundation
{
    internal sealed class RelationshipGraphLevelEnumerator : IEnumerator<RelationshipGraphLevel>
    {
        private RelationshipGraph _relationshipGraph;
        private RelationshipGraphLevel _currentLevel = null;

        internal RelationshipGraphLevelEnumerator(RelationshipGraph relationshipGraph)
        {
            _relationshipGraph = relationshipGraph;
        }

        public RelationshipGraphLevel Current
        {
            get { return _currentLevel; }
        }

        public void Dispose()
        {
        }

        object IEnumerator.Current
        {
            get { return _currentLevel; }
        }

        public bool MoveNext()
        {
            int levelNumber;

            if (_currentLevel == null)
            {
                levelNumber = 0;
            }
            else
            {
                levelNumber = _currentLevel.Level + 1;
            }

            RelationshipGraphLevel newLevel = _relationshipGraph.GetLevel(levelNumber);
            if (newLevel == null) return false;

            _currentLevel = newLevel;

            return true;
        }

        public void Reset()
        {
            _currentLevel = null;
        }
    }
}

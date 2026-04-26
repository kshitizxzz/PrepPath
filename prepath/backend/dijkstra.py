import heapq
from typing import List, Dict, Tuple
from enum import Enum
from datetime import datetime, timedelta

class TopicDifficulty(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

# Topic graph with dependencies, difficulty, and micro-topics
TOPIC_GRAPH = {
    "arrays": {
        "difficulty": TopicDifficulty.EASY,
        "dependencies": [],
        "days": 5,
        "resources": ["LeetCode", "GeeksforGeeks", "YouTube"],
        "micro_topics": ["Basic Operations", "Two Pointers", "Sliding Window", "Prefix Sum"],
        "problems_per_day": 2,
    },
    "strings": {
        "difficulty": TopicDifficulty.EASY,
        "dependencies": ["arrays"],
        "days": 4,
        "resources": ["LeetCode", "HackerRank"],
        "micro_topics": ["Pattern Matching", "Palindromes", "Anagrams", "String Manipulation"],
        "problems_per_day": 2,
    },
    "linked_lists": {
        "difficulty": TopicDifficulty.MEDIUM,
        "dependencies": ["arrays"],
        "days": 4,
        "resources": ["LeetCode", "Striver SDE Sheet"],
        "micro_topics": ["Single LL", "Double LL", "Cycle Detection", "Reversal"],
        "problems_per_day": 2,
    },
    "stacks_queues": {
        "difficulty": TopicDifficulty.MEDIUM,
        "dependencies": ["arrays", "linked_lists"],
        "days": 3,
        "resources": ["LeetCode", "YouTube"],
        "micro_topics": ["Stack Operations", "Queue Operations", "Monotonic Stack", "Deque"],
        "problems_per_day": 2,
    },
    "trees": {
        "difficulty": TopicDifficulty.MEDIUM,
        "dependencies": ["linked_lists"],
        "days": 6,
        "resources": ["LeetCode Premium", "Striver SDE"],
        "micro_topics": ["Traversals", "BST", "Balanced Trees", "LCA", "Path Sum"],
        "problems_per_day": 2,
    },
    "graphs": {
        "difficulty": TopicDifficulty.HARD,
        "dependencies": ["trees"],
        "days": 6,
        "resources": ["LeetCode", "Codeforces"],
        "micro_topics": ["BFS/DFS", "Shortest Path", "Topological Sort", "MST", "Bipartite"],
        "problems_per_day": 3,
    },
    "binary_search": {
        "difficulty": TopicDifficulty.MEDIUM,
        "dependencies": ["arrays"],
        "days": 3,
        "resources": ["LeetCode", "Neetcode.io"],
        "micro_topics": ["Standard Binary Search", "Search Space Reduction", "Counting"],
        "problems_per_day": 2,
    },
    "sorting": {
        "difficulty": TopicDifficulty.EASY,
        "dependencies": ["arrays"],
        "days": 3,
        "resources": ["LeetCode", "GeeksforGeeks"],
        "micro_topics": ["Sorting Algorithms", "Merge Sort", "Quick Sort", "Counting Sort"],
        "problems_per_day": 2,
    },
    "hashing": {
        "difficulty": TopicDifficulty.MEDIUM,
        "dependencies": ["arrays", "strings"],
        "days": 3,
        "resources": ["LeetCode", "Striver"],
        "micro_topics": ["Hash Maps", "Sets", "Collision Handling", "Two Sum Variants"],
        "problems_per_day": 2,
    },
    "dynamic_programming": {
        "difficulty": TopicDifficulty.HARD,
        "dependencies": ["binary_search", "hashing"],
        "days": 8,
        "resources": ["AtCoder", "Codeforces", "Striver DP Sheet"],
        "micro_topics": ["1D DP", "2D DP", "Knapsack", "String DP", "Interval DP", "Game Theory"],
        "problems_per_day": 3,
    },
}

# Company-specific topic priorities
COMPANY_PRIORITIES = {
    "google": {"graphs": 10, "dynamic_programming": 9, "trees": 8, "arrays": 7},
    "meta": {"arrays": 10, "graphs": 9, "sorting": 8, "strings": 7},
    "amazon": {"arrays": 10, "strings": 9, "trees": 8, "linked_lists": 7},
    "microsoft": {"arrays": 9, "trees": 9, "graphs": 8, "dynamic_programming": 7},
    "apple": {"arrays": 10, "sorting": 9, "searching": 8, "binary_search": 8},
}

# Default priority
DEFAULT_PRIORITY = {topic: 5 for topic in TOPIC_GRAPH}

def normalize_topic_name(topic: str) -> str:
    """Normalize topic name from frontend format to backend format"""
    mapping = {
        "arrays": "arrays",
        "strings": "strings",
        "linked lists": "linked_lists",
        "stacks": "stacks_queues",
        "queues": "stacks_queues",
        "trees": "trees",
        "graphs": "graphs",
        "binary search": "binary_search",
        "searching": "binary_search",
        "sorting": "sorting",
        "hashing": "hashing",
        "hash tables": "hashing",
        "dynamic programming": "dynamic_programming",
    }
    return mapping.get(topic.lower(), topic.lower().replace(" ", "_"))


def get_company_priority(company: str) -> Dict[str, int]:
    """Get topic priorities for specific company"""
    company_key = company.lower()
    return COMPANY_PRIORITIES.get(company_key, DEFAULT_PRIORITY)


def adjust_topic_days(topic: str, base_days: int, weak_topics: List[str], 
                     days_available: int, skill_level: str) -> int:
    """Adjust days for a topic based on weak topics and skill level"""
    days = base_days
    
    # Weak topics get more days
    if topic in weak_topics:
        days = int(days * 1.5)  # 50% more days for weak topics
    
    # Skill level adjustment
    if skill_level == "beginner":
        days = int(days * 1.3)  # Beginners need more time
    elif skill_level == "advanced":
        days = int(days * 0.7)  # Advanced learners need less time
    
    return max(days, 1)  # At least 1 day


def generate_day_wise_roadmap(
    target_company: str,
    days_available: int,
    weak_topics: List[str],
    skill_level: str,
) -> Dict:
    """
    Generate day-wise personalized roadmap.
    Returns day-by-day breakdown with topics, micro-topics, and problems.
    """
    
    # Normalize weak topics
    weak_topics_normalized = [normalize_topic_name(t) for t in weak_topics 
                             if normalize_topic_name(t) in TOPIC_GRAPH]
    
    # Get company priorities
    priorities = get_company_priority(target_company)
    
    # Select and order topics based on company priority, weak topics, and dependencies
    selected_topics = []
    total_days_planned = 0
    
    # First, add weak topics with their dependencies
    def add_topic_with_deps(topic: str, selected: List[str], days_used: int) -> Tuple[List[str], int]:
        if topic in selected:
            return selected, days_used
        
        topic_data = TOPIC_GRAPH[topic]
        
        # Add dependencies first
        for dep in topic_data["dependencies"]:
            selected, days_used = add_topic_with_deps(dep, selected, days_used)
        
        # Calculate adjusted days for this topic
        adjusted_days = adjust_topic_days(
            topic, 
            topic_data["days"], 
            weak_topics_normalized, 
            days_available, 
            skill_level
        )
        
        # Add topic if we have space
        if days_used + adjusted_days <= days_available:
            selected.append(topic)
            days_used += adjusted_days
        
        return selected, days_used
    
    # Add weak topics first (highest priority)
    for weak_topic in weak_topics_normalized:
        selected_topics, total_days_planned = add_topic_with_deps(
            weak_topic, selected_topics, total_days_planned
        )
    
    # Sort remaining topics by company priority
    remaining_topics = [(topic, priorities.get(topic, 5)) for topic in TOPIC_GRAPH 
                       if topic not in selected_topics]
    remaining_topics.sort(key=lambda x: x[1], reverse=True)
    
    # Add remaining topics if space available
    for topic, _ in remaining_topics:
        topic_data = TOPIC_GRAPH[topic]
        adjusted_days = adjust_topic_days(
            topic, 
            topic_data["days"], 
            weak_topics_normalized, 
            days_available, 
            skill_level
        )
        
        # Check if all dependencies are met
        deps_met = all(dep in selected_topics for dep in topic_data["dependencies"])
        
        if deps_met and total_days_planned + adjusted_days <= days_available:
            selected_topics.append(topic)
            total_days_planned += adjusted_days
    
    # Generate day-wise schedule
    daily_schedule = []
    current_day = 1
    topic_day_counters = {topic: 0 for topic in selected_topics}
    topic_days_needed = {}
    
    for topic in selected_topics:
        topic_days_needed[topic] = adjust_topic_days(
            topic,
            TOPIC_GRAPH[topic]["days"],
            weak_topics_normalized,
            days_available,
            skill_level
        )
    
    while current_day <= days_available:
        day_entry = {
            "day": current_day,
            "topics": [],
            "isRevisionDay": False,
            "isMockContest": False,
            "totalProblems": 0,
        }
        
        # Every 7th day is revision day
        if current_day % 7 == 0 and current_day > 1:
            day_entry["isRevisionDay"] = True
            day_entry["topics"] = [{
                "name": "Revision Day",
                "microTopics": ["Review all topics learned so far", "Solve mixed problems"],
                "difficulty": "medium",
                "problems": 5,
            }]
            day_entry["totalProblems"] = 5
        
        # Every 15th day is mock contest
        elif current_day % 15 == 0 and current_day > 1:
            day_entry["isMockContest"] = True
            day_entry["topics"] = [{
                "name": "Mock Contest",
                "microTopics": ["Full-length contest", "Time-based problem solving"],
                "difficulty": "hard",
                "problems": 5,
            }]
            day_entry["totalProblems"] = 5
        
        # Regular learning day
        else:
            # Find topics that still need days
            remaining_topics = [t for t in selected_topics if topic_day_counters[t] < topic_days_needed[t]]
            
            if remaining_topics:
                # Pick first topic that needs days
                current_topic = remaining_topics[0]
                topic_data = TOPIC_GRAPH[current_topic]
                
                micro_topics = topic_data.get("micro_topics", [])
                # Distribute micro-topics across the days
                micro_topic_idx = topic_day_counters[current_topic]
                selected_micro = micro_topics[micro_topic_idx % len(micro_topics)] if micro_topics else "General Practice"
                
                day_entry["topics"].append({
                    "name": current_topic.replace("_", " ").title(),
                    "microTopics": [selected_micro],
                    "difficulty": topic_data["difficulty"],
                    "problems": topic_data.get("problems_per_day", 2),
                })
                day_entry["totalProblems"] += topic_data.get("problems_per_day", 2)
                topic_day_counters[current_topic] += 1
        
        daily_schedule.append(day_entry)
        current_day += 1
    
    return {
        "dailySchedule": daily_schedule,
        "totalDays": len(daily_schedule),
        "selectedTopics": selected_topics,
        "weak_topics": weak_topics_normalized,
        "skill_level": skill_level,
        "target_company": target_company,
    }



def dijkstra_roadmap(
    target_company: str,
    days_available: int,
    weak_topics: List[str],
    skill_level: str,
) -> Tuple[List[Dict], List[Tuple[str, str]]]:
    """
    Generate optimized roadmap using Dijkstra algorithm.
    Weak topics get higher priority (lower cost).
    Respects topic dependencies.
    """
    
    # Normalize weak topics
    weak_topics_normalized = [normalize_topic_name(t) for t in weak_topics if normalize_topic_name(t) in TOPIC_GRAPH]
    
    # Weight adjustment based on skill level
    skill_multipliers = {
        "beginner": 1.5,
        "intermediate": 1.0,
        "advanced": 0.7,
    }
    multiplier = skill_multipliers.get(skill_level, 1.0)
    
    # Calculate costs
    costs = {}
    for topic in TOPIC_GRAPH:
        base_days = TOPIC_GRAPH[topic]["days"]
        
        # Weak topics get higher priority (lower cost)
        if topic in weak_topics_normalized:
            cost = base_days * 0.6  # 40% reduction for weak topics
        else:
            cost = base_days * 1.2  # Slightly lower priority for non-weak topics
        
        # Apply skill multiplier
        cost = cost * multiplier
        costs[topic] = cost
    
    # Sort topics by cost (priority) - weak topics first
    sorted_topics = sorted(costs.items(), key=lambda x: x[1])
    
    # Select topics respecting dependencies - prioritize weak topics
    selected_topics = []
    total_days = 0
    
    # First pass: add all weak topics with their dependencies
    for topic in weak_topics_normalized:
        if topic not in selected_topics:
            # Add dependencies first
            def add_with_deps(t):
                if t in selected_topics:
                    return True
                topic_data = TOPIC_GRAPH[t]
                for dep in topic_data["dependencies"]:
                    if not add_with_deps(dep):
                        return False
                selected_topics.append(t)
                return True
            
            add_with_deps(topic)
    
    # Calculate current total days
    total_days = sum(TOPIC_GRAPH[t]["days"] for t in selected_topics)
    
    # Second pass: add other topics if there's time
    for topic, _ in sorted_topics:
        if topic not in selected_topics:
            topic_data = TOPIC_GRAPH[topic]
            topic_days = topic_data["days"]
            
            # Check if dependencies are met
            deps_met = all(dep in selected_topics for dep in topic_data["dependencies"])
            
            # Add if dependencies met and within time budget
            if deps_met and total_days + topic_days <= days_available:
                selected_topics.append(topic)
                total_days += topic_days
    
    # Build output roadmap
    roadmap_nodes = []
    node_edges = []
    
    for i, topic in enumerate(selected_topics):
        topic_data = TOPIC_GRAPH[topic]
        node = {
            "id": str(i),
            "title": topic.replace("_", " ").title(),
            "topic": topic,
            "difficulty": topic_data["difficulty"],
            "daysToPrepare": topic_data["days"],
            "resources": topic_data["resources"],
            "completed": False,
        }
        roadmap_nodes.append(node)
        
        # Add edges from dependencies
        for dep in topic_data["dependencies"]:
            if dep in selected_topics:
                dep_idx = selected_topics.index(dep)
                node_edges.append((str(dep_idx), str(i)))
    
    return roadmap_nodes, node_edges

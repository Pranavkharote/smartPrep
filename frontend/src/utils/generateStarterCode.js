export const generateStarterCode = (functionName, langId) => {
  if (functionName === "twoSum" && langId === 54) {
    return `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var ${functionName} = function(nums, target) {

};`;
  }
  if (functionName === "twoSum" && langId === 62) {
    return `class Solution {
    public int[] ${functionName}(int[] nums, int target) {
        
    }
}`;
  }
  if (functionName === "twoSum" && langId === 63) {
    return `class Solution {
public:
    vector<int> ${functionName}(vector<int>& nums, int target) {
        
    }
};`;
  }
  if (functionName === "twoSum" && langId === 71) {
    return `from typing import List
class Solution:
    def ${functionName}(self, nums: List[int], target: int) -> List[int]:
    `;
  }
  if (functionName === "isValid" && langId === 54) {
    //js
    return `/**
 * @param {string} s
 * @return {boolean}
 */
var ${functionName} = function(s){
      //Your code here

}`;
  }
  if (functionName === "isValid" && langId === 62) {
    //java
    return `class Solution {
    public boolean ${functionName}(String s) {
        
    }
}`;
  }
  if (functionName === "isValid" && langId === 71) {
    //py
    return `class Solution:
    def ${functionName}(self, s: str) -> bool:
        
        `;
  }
  if (functionName === "isValid" && langId === 63) {
    //cpp
    return `class Solution {
public:
    bool ${functionName}(string s) {
        
    }
};
        `;
  }
  if (functionName === "maximumSubarray" && langId === 63) {
    //cpp
    return `class Solution {
public:
    int ${functionName}(vector<int>& nums) {
        
    }
};`;
  }
  if (functionName === "maximumSubarray" && langId === 54) {
    //js
    return `/**
 * @param {number[]} nums
 * @return {number}
 */
var ${functionName} = function(nums) {
    
};`;
  }
  if (functionName === "maximumSubarray" && langId === 62) {
    //js
    return `class Solution {
    public int ${functionName}(int[] nums) {
        
    }
}`;
  }
  if (functionName === "maximumSubarray" && langId === 71) {
    //py
    return `from typing import List
class Solution:
    def ${functionName}(self, nums: List[int]) -> int:   
     `;
  }
  if (functionName === "bestTimeToBuyAndSellStock" && langId === 63) {
    return `class Solution {
public:
    int ${functionName}(vector<int>& prices) {
        
    }
};`;
  }
  if (functionName === "bestTimeToBuyAndSellStock" && langId === 62) {
    return `class Solution {
    public int ${functionName}(int[] prices) {
        //your code here

    }
}`;
  }
  if (functionName === "bestTimeToBuyAndSellStock" && langId === 54) {
    return `/**
 * @param {number[]} prices
 * @return {number}
 */
var ${functionName} = function(prices) {
    
};`;
  }
  if (functionName === "bestTimeToBuyAndSellStock" && langId === 71) {
    return `from typing import List
class Solution:
    def ${functionName}(self, prices: List[int]) -> int: 
     `;
  }
  if (functionName === "removeDuplicatesFromSortedArray" && langId === 63) {
    return `class Solution {
public:
    int ${functionName}(vector<int>& nums) {
        
    }
};`;
  }
  if (functionName === "removeDuplicatesFromSortedArray" && langId === 62) {
    return `class Solution {
    public int ${functionName}(int[] nums) {
        
    }
}`;
  }
  if (functionName === "removeDuplicatesFromSortedArray" && langId === 54) {
    return `/**
 * @param {number[]} nums
 * @return {number}
 */
var ${functionName} = function(nums) {
    
};`;
  }
  if (functionName === "removeDuplicatesFromSortedArray" && langId === 71) {
    return `class Solution(object):
    def ${functionName}(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        `;
  }
  if (functionName === "climbStairs" && langId === 54) {
    return `/**
 * @param {number} n
 * @return {number}
 */
var ${functionName} = function(n) {
    
};`;
  }
  if (functionName === "climbStairs" && langId === 63) {
    return `class Solution {
public:
    int ${functionName}(int n) {
        
    }
};`;
  }
  if (functionName === "climbStairs" && langId === 62) {
    return `class Solution {
    public int ${functionName}(int n) {
        
    }
}
};`;
  }
  if (functionName === "climbStairs" && langId === 71) {
    return `class Solution:
    def ${functionName}(self, n: int) -> int:
        `;
  }
  if (functionName === "findMedianSortedArrays" && langId === 71) {
    return `class Solution:
    def ${functionName}(self, nums1: List[int], nums2: List[int]) -> float:
        `;
  }
  if (functionName === "findMedianSortedArrays" && langId === 54) {
    return `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var ${functionName} = function(nums1, nums2) {
    
};`;
  }
  if (functionName === "findMedianSortedArrays" && langId === 63) {
    return `class Solution {
public:
    double ${functionName}(vector<int>& nums1, vector<int>& nums2) {
        
    }
};`;
  }
  if (functionName === "ladderLength" && langId === 54) {
    return `/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ${functionName} = function(beginWord, endWord, wordList) {
    
};`;
  }
  if (functionName === "ladderLength" && langId === 71) {
    return `class Solution:
    def ${functionName}(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
     `;
  }
  if (functionName === "ladderLength" && langId === 63) {
    return `class Solution {
public:
    int ${functionName}(string beginWord, string endWord, vector<string>& wordList) {
        
    }
};`;
  }
  if (functionName === "findKthLargest" && langId === 54) {
    return `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var ${functionName} = function(nums, k) {
    
};`;
  }
  if (functionName === "findKthLargest" && langId === 71) {
    return `class Solution:
    def ${functionName}(self, nums: List[int], k: int) -> int:
        `;
  }
  if (functionName === "findKthLargest" && langId === 63) {
    return `class Solution {
public:
    int ${functionName}(vector<int>& nums, int k) {
        
    }
};`;
  }
  if (functionName === "mergeTwoLists" && langId === 63) {
    return `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        
    }
};`;
  }
  if (functionName === "mergeTwoLists" && langId === 71) {
    return `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        `;
  }
  if (functionName === "mergeTwoLists" && langId === 54) {
    return `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    
};`;
  }
  if (functionName === "search" && langId === 71) {
    return `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        `;
  }
  if (functionName === "search" && langId === 63) {
    return `class Solution {
public:
    int search(vector<int>& nums, int target) {
        
    }
};`;
  }
  if (functionName === "search" && langId === 54) {
    return `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    
};`;
  }
  if (functionName === "diameterOfBinaryTree" && langId === 54) {
    return `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
    
};`;
  }
  if (functionName === "diameterOfBinaryTree" && langId === 63) {
    return `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        
    }
};`;
  }
  if (functionName === "diameterOfBinaryTree" && langId === 71) {
    return `class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        `;
  }
  
};

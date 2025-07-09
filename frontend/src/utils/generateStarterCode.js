export  const generateStarterCode = (functionName, langId) => {
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
    if (functionName === "mergeTwoSortedLists" && langId === 71) {
      //js
      return `# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def ${functionName} (self, list1, list2):
        """
        :type list1: Optional[ListNode]
        :type list2: Optional[ListNode]
        :rtype: Optional[ListNode]
        """
        `;
    }
    if (functionName === "mergeTwoSortedLists" && langId === 54) {
      //js
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
var ${functionName} = function(list1, list2) {
    
};`;
    }
    if (functionName === "mergeTwoSortedList" && langId === 62) {
      //js
      return `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode ${functionName}(ListNode list1, ListNode list2) {
        
    }
}`;
    }
    if (functionName === "mergeTwoSortedList" && langId === 63) {
      //js
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
    ListNode* ${functionName}(ListNode* list1, ListNode* list2) {
        
    }
};`;
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
  };
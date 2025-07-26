"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckSquare, Calendar, Briefcase, Users, Code, AlertCircle, Clock, CheckCircle, X, Filter } from "lucide-react"

interface SidebarProps {
  selectedCategory: string
  selectedPriority: string
  selectedStatus: string
  onCategoryChange: (category: string) => void
  onPriorityChange: (priority: string) => void
  onStatusChange: (status: string) => void
  onClose: () => void
}

export function Sidebar({
  selectedCategory,
  selectedPriority,
  selectedStatus,
  onCategoryChange,
  onPriorityChange,
  onStatusChange,
  onClose,
}: SidebarProps) {
  const categories = [
    { id: "all", name: "All Categories", icon: CheckSquare, count: 12 },
    { id: "Work", name: "Work", icon: Briefcase, count: 5 },
    { id: "Meeting", name: "Meeting", icon: Users, count: 3 },
    { id: "Development", name: "Development", icon: Code, count: 2 },
    { id: "Personal", name: "Personal", icon: Calendar, count: 2 },
  ]

  const priorities = [
    { id: "all", name: "All Priorities", color: "bg-slate-500", textColor: "text-slate-700", count: 12 },
    { id: "high", name: "High Priority", color: "bg-red-500", textColor: "text-red-700", count: 3 },
    { id: "medium", name: "Medium Priority", color: "bg-yellow-500", textColor: "text-yellow-700", count: 6 },
    { id: "low", name: "Low Priority", color: "bg-green-500", textColor: "text-green-700", count: 3 },
  ]

  const statuses = [
    { id: "all", name: "All Status", icon: CheckSquare, count: 12, color: "text-slate-600" },
    { id: "todo", name: "To Do", icon: Clock, count: 5, color: "text-slate-600" },
    { id: "in-progress", name: "In Progress", icon: AlertCircle, count: 4, color: "text-blue-600" },
    { id: "completed", name: "Completed", icon: CheckCircle, count: 3, color: "text-green-600" },
  ]

  return (
    <div className="h-full bg-white border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 flex items-center justify-between h-[73px]">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Filter className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Filters</h2>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Categories */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Categories</h3>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.id
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "secondary" : "ghost"}
                  className={`w-full justify-between group hover:bg-slate-50 ${
                    isSelected ? "bg-blue-50 text-blue-700 border border-blue-200" : ""
                  }`}
                  onClick={() => onCategoryChange(category.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${isSelected ? "text-blue-600" : "text-slate-500"}`} />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                    {category.count}
                  </Badge>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Priority */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Priority</h3>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <div className="space-y-1">
            {priorities.map((priority) => {
              const isSelected = selectedPriority === priority.id
              return (
                <Button
                  key={priority.id}
                  variant={isSelected ? "secondary" : "ghost"}
                  className={`w-full justify-between group hover:bg-slate-50 ${
                    isSelected ? "bg-blue-50 text-blue-700 border border-blue-200" : ""
                  }`}
                  onClick={() => onPriorityChange(priority.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${priority.color}`} />
                    <span className="font-medium">{priority.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                    {priority.count}
                  </Badge>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Status */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Status</h3>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <div className="space-y-1">
            {statuses.map((status) => {
              const Icon = status.icon
              const isSelected = selectedStatus === status.id
              return (
                <Button
                  key={status.id}
                  variant={isSelected ? "secondary" : "ghost"}
                  className={`w-full justify-between group hover:bg-slate-50 ${
                    isSelected ? "bg-blue-50 text-blue-700 border border-blue-200" : ""
                  }`}
                  onClick={() => onStatusChange(status.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${isSelected ? "text-blue-600" : status.color}`} />
                    <span className="font-medium">{status.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                    {status.count}
                  </Badge>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Clear Filters */}
        <div className="pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            className="w-full text-slate-600 hover:text-slate-800 bg-transparent"
            onClick={() => {
              onCategoryChange("all")
              onPriorityChange("all")
              onStatusChange("all")
            }}
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  )
}

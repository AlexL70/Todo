using System;
using System.Threading;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private Random rnd;
        private void Wait()
        {
            var delay = rnd.Next(10, 1000);
            Thread.Sleep(delay);
        }

        public TodoController(ITodoRepository todoItems)
        {
            TodoItems = todoItems;
            rnd = new Random(DateTime.Now.Millisecond);
        }
        public ITodoRepository TodoItems { get; set; }

        //  GET /api/todo
        [HttpGet]
        public IEnumerable<TodoItem> GetAll()
        {
            Wait();
            return TodoItems.GetAll();
        }

        //  GET /api/todo/{id}
        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetById(string Id)
        {
            Wait();
            var item = TodoItems.Find(Id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        //  POST /api/todo
        [HttpPost]
        public IActionResult Create([FromBody] TodoItem item)
        {
            if (item == null || String.IsNullOrWhiteSpace(item.Name))
            {
                return BadRequest(new { message = "No item provided" });
            }
            if (String.IsNullOrWhiteSpace(item.Name))
            {
                return BadRequest(new { message = "Item name cannot be empty" });
            }
            Wait();
            TodoItems.Add(item);
            return CreatedAtRoute("GetTodo", new { id = item.Key }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] TodoItem item)
        {
            if (item == null || item.Key != id)
            {
                return BadRequest();
            }

            Wait();
            var todo = TodoItems.Find(id);
            if (todo == null)
            {
                return NotFound();
            }

            TodoItems.Update(item);
            return new NoContentResult();
        }

        [HttpPatch("{id}")]
        public IActionResult Update([FromBody] TodoItem item, string id)
        {
            if(item == null)
            {
                return BadRequest();
            }

            Wait();
            var todo = TodoItems.Find(id);
            if (todo == null)
            {
                return NotFound();
            }

            item.Key = todo.Key;

            TodoItems.Update(item);
            return new NoContentResult();

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            Wait();
            var todo = TodoItems.Find(id);

            if (todo == null)
            {
                return NotFound();
            }

            TodoItems.Remove(id);
            return new NoContentResult();
        }
    }
}

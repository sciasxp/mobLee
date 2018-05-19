#!/usr/bin/env python
# vim: set sw=4 sts=4 ts=4 et si:

from SimpleHTTPServer import SimpleHTTPRequestHandler
import BaseHTTPServer

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
    	SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    BaseHTTPServer.test(CORSRequestHandler, BaseHTTPServer.HTTPServer)
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"></xsl:output>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Project Record</title>
                <meta charset="UTF-8"/>
            </head>
            <body>
                <h1><center>Project Record</center> </h1>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <hr/>
        <table width="85%" cellpadding="2px">
            <tr align="left">
                <th><b>KEY NAME:</b></th>
                <td><xsl:value-of select="keyname"/></td>
                
                <th><b>BEGIN DATE:</b></th>
                <td><xsl:value-of select="bdate"/></td>
            </tr>
            <tr align="left">
                <th><b>TITLE:</b></th>
                <td><xsl:value-of select="title"/></td>
                
                <th><b>END DATE:</b></th>
                <td><xsl:value-of select="edate"/></td>
            </tr>
            <tr align="left">
                <xsl:choose>
                    <xsl:when test="subtitle">
                        <th><b>SUBTITLE:</b></th>
                        <td><xsl:value-of select="subtitle"/></td>
                    </xsl:when>
                </xsl:choose>
                
                <th><b>SUPERVISOR:</b></th>
                <td>
                    <xsl:value-of select="supervisor/name"/> - 
                    <a href="mailto:{supervisor/email}">
                        <xsl:value-of select="supervisor/email"/></a> - 
                    <a href="{supervisor/homepage}">Homepage</a>
                </td>
            </tr>
        </table>
        <hr/>   
    </xsl:template>
    
    <xsl:template match="workteam">
        <hr/>
        <h3>WorkTeam:</h3>
        <table width="100%">
            <xsl:apply-templates/>
        </table>
        <hr/>
    </xsl:template>
    
    <xsl:template match="member">
        <tr>
            <td>
                <ul>
                    <li>
                        <xsl:value-of select="identifier"/> - <xsl:value-of select="name"/> - 
                        <a href="mailto:{email}"><xsl:value-of select="email"/></a>
                    </li>
                </ul>
            </td>         
            <td>
                <xsl:choose>
                    <xsl:when test="photo">
                        <img src="{photo/@path}" width="30%"></img>
                    </xsl:when>
                </xsl:choose>
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="abstract">
        <hr/>
        <h3>Abstract:</h3>
        <xsl:apply-templates/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="p">
        <p><xsl:apply-templates/></p>
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:apply-templates/></b>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:apply-templates/></i>
    </xsl:template>
    
    <xsl:template match="u">
        <u><xsl:apply-templates/></u>
    </xsl:template>
    
    <xsl:template match="xref">
        <a href="{@url}">
            <xsl:apply-templates/>
        </a>
    </xsl:template>
    
    <xsl:template match="deliverables">
        <hr/>
        <h3>Deliverables:</h3>
        <ul>
            <xsl:apply-templates/>
        </ul>
        <hr/>
    </xsl:template>
    
    <xsl:template match="deliverable">
        <li>
            <a href="{@path}"><xsl:value-of select="."/></a>
        </li>
    </xsl:template>
    
    
</xsl:stylesheet>